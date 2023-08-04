import { Component } from '@angular/core';
import { IndexedDbService } from 'src/app/services/indexdb.service';
import { Notificacion } from 'src/app/models/notificacion.model';
import { MessageService } from 'primeng/api';
import { Proyecto } from 'src/app/models/proyecto.model';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css'],
})
export class NotificacionComponent {
  nuevoNotificacion: Notificacion = {
    id: 0,
    fecha: new Date(),
    proyectoId: 0,
    tiempoDedicado: 0,
    recursoId: 0,
    avance: 0,
  };
  recursosMostrar: Notificacion[] = [];
  proyectosMostrar: Proyecto[] = [];

  constructor(
    private indexedDbService: IndexedDbService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.obtenerNotificaciones();
  }

  private showSuccessMessage(message: string) {
    console.log(message);
    this.messageService.add({
      severity: 'success',
      summary: 'Exito',
      detail: message,
      life: 3000,
    });
    this.obtenerNotificaciones();
  }

  private showErrorMessage(summary: string, detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
      life: 3000,
    });
    this.obtenerNotificaciones();
  }

  private handleError(error: any, summary: string, detail: string) {
    console.error(summary, error);
    this.showErrorMessage(error.name, detail);
    this.obtenerNotificaciones();
  }

  getProyecto(id: number): Promise<Proyecto> {
    return new Promise((resolve, reject) => {
      this.indexedDbService
        .getProyecto(id)
        .then((proyecto) => {
          if (!proyecto) {
            console.warn(`Proyecto con ID ${id} no encontrado.`);
            this.showErrorMessage(
              'Error',
              `Proyecto con ID ${id} no encontrado.`
            );
            reject();
            return;
          }
          resolve(proyecto);
        })
        .catch((error) => {
          console.error('Error al obtener proyecto', error);
          this.handleError(error, 'Error al obtener proyecto', error.message);
          reject(error);
        });
    });
  }

  async agregarNotificacion() {
    if (
      this.nuevoNotificacion.id === 0 ||
      this.nuevoNotificacion.recursoId === 0 ||
      this.nuevoNotificacion.proyectoId === 0 ||
      this.nuevoNotificacion.tiempoDedicado === 0 ||
      this.nuevoNotificacion.avance === 0
    ) {
      this.showErrorMessage(
        'Error',
        'Todos los campos son obligatorios, excepto la fecha'
      );

      return;
    }

    try {
      const proyecto = await this.getProyecto(
        this.nuevoNotificacion.proyectoId
      );
      await this.indexedDbService.addNotificacion(this.nuevoNotificacion);
      proyecto.progreso += this.nuevoNotificacion.avance;
      await this.indexedDbService.updateProyecto(proyecto);
      console.log(proyecto);
      console.log(this.nuevoNotificacion);
      console.log('Notificación agregada exitosamente');
      this.showSuccessMessage('Notificación agregada exitosamente');

      this.nuevoNotificacion = {
        id: 0,
        fecha: new Date(),
        proyectoId: 0,
        tiempoDedicado: 0,
        recursoId: 0,
        avance: 0,
      }; // Limpiar el formulario
    } catch (error) {
      this.handleError(
        error,
        'Error al agregar notificación',
        'Error al agregar notificación'
      );
    }
  }

  async obtenerNotificaciones() {
    try {
      const notificaciones = await this.indexedDbService.getAllNotificaciones();
      console.log('Notificaciones obtenidas:', notificaciones);
      this.recursosMostrar = notificaciones;
    } catch (error) {
      this.handleError(
        error,
        'Error al obtener notificaciones',
        'Error al obtener notificaciones'
      );
    }
  }

  private updateNotificacionProperties(notificacion: Notificacion) {
    notificacion.fecha = this.nuevoNotificacion.fecha;
    notificacion.avance = this.nuevoNotificacion.avance;
    notificacion.proyectoId = this.nuevoNotificacion.proyectoId;
    notificacion.recursoId = this.nuevoNotificacion.recursoId;
    notificacion.tiempoDedicado = this.nuevoNotificacion.tiempoDedicado;
  }

  async actualizarNotificacion() {
    try {
      const notificacion = await this.indexedDbService.getNotificacion(
        this.nuevoNotificacion.id
      );

      if (!notificacion) {
        const errorMsg = `Notificacion con ID ${this.nuevoNotificacion.id} no encontrada.`;
        console.warn(errorMsg);
        this.showErrorMessage('Error', errorMsg);
        return;
      }

      const proyecto = await this.getProyecto(
        this.nuevoNotificacion.proyectoId
      );

      const progresoAnterior: number = notificacion.avance;

      this.updateNotificacionProperties(notificacion);
      proyecto.progreso -= progresoAnterior;
      proyecto.progreso += this.nuevoNotificacion.avance;

      await this.indexedDbService.updateNotificacion(notificacion);
      await this.indexedDbService.updateProyecto(proyecto);

      this.showSuccessMessage('Notificacion actualizada exitosamente');
    } catch (error) {
      this.handleError(
        error,
        'Error al actualizar notificacion',
        'Error al obtener notificacion para actualización'
      );
    }
  }

  eliminarNotificacion() {
    this.indexedDbService
      .deleteNotificacion(this.nuevoNotificacion.id)
      .then(() => {
        this.showSuccessMessage('Notificacion eliminada exitosamente');
      })
      .catch((error) => {
        console.error('Error al eliminar notificacion', error);
        this.handleError(
          error,
          'Error al eliminar notificacion',
          error.message
        );
      });
  }
}
