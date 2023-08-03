import { Component } from '@angular/core';
import { IndexedDbService } from 'src/app/services/indexdb.service';
import { Notificacion } from 'src/app/models/notificacion.model';
import { MessageService } from 'primeng/api';

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

  constructor(
    private indexedDbService: IndexedDbService,
    private messageService: MessageService
  ) {}
  agregarNotificacion() {
    if (this.nuevoNotificacion.id === 0) {
      console.warn('ID de notificacion vacío, no se agrega.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'ID de notificacion vacío, no se agrega.',
      });
      return;
    }
    if (this.nuevoNotificacion.recursoId === 0) {
      console.warn('ID de recurso vacío, no se agrega.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'ID de recurso vacío, no se agrega.',
      });

      return;
    }
    if (this.nuevoNotificacion.proyectoId === 0) {
      console.warn('ID de proyecto vacío, no se agrega.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'ID de proyecto vacío, no se agrega.',
      });

      return;
    }
    if (this.nuevoNotificacion.tiempoDedicado === 0) {
      console.warn('Tiempo dedicado vacío, no se agrega.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Tiempo dedicado vacío, no se agrega.',
      });
      return;
    }
    if (this.nuevoNotificacion.avance === 0) {
      console.warn('Avance vacío, no se agrega.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Avance vacío, no se agrega.',
      });
      return;
    }

    this.indexedDbService
      .addNotificacion(this.nuevoNotificacion)
      .then(() => {
        console.log('Notificacion agregada exitosamente');
        this.nuevoNotificacion = {
          id: 0,
          fecha: new Date(),
          proyectoId: 0,
          tiempoDedicado: 0,
          recursoId: 0,
          avance: 0,
        }; // Limpiar el formulario
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Notificacion agregada exitosamente',
        });
        this.obtenerNotificaciones();
      })
      .catch((error) => {
        console.error('Error al agregar notificacion', error);
        this.messageService.add({
          severity: 'error',
          summary: error.name,
          detail: 'Error al agregar notificacion',
        });
        this.obtenerNotificaciones();
      });
  }

  obtenerNotificaciones() {
    this.indexedDbService
      .getAllNotificaciones()
      .then((notificaciones) => {
        console.log('Notificaciones obtenidas:', notificaciones);
        this.recursosMostrar = notificaciones;
      })
      .catch((error) => {
        console.error('Error al obtener notificaciones', error);
        this.messageService.add({
          severity: 'error',
          summary: error.name,
          detail: 'Error al obtener notificaciones',
        });
      });
  }

  actualizarNotificacion() {
    this.indexedDbService
      .getNotificacion(this.nuevoNotificacion.id)
      .then((notificacion) => {
        if (!notificacion) {
          console.warn(
            `Notificacion con ID ${this.nuevoNotificacion.id} no encontrada.`
          );
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Notificacion con ID ${this.nuevoNotificacion.id} no encontrada.`,
          });
          this.obtenerNotificaciones();
          return;
        }
        notificacion.fecha = this.nuevoNotificacion.fecha;
        notificacion.avance = this.nuevoNotificacion.avance;
        notificacion.proyectoId = this.nuevoNotificacion.proyectoId;
        notificacion.recursoId = this.nuevoNotificacion.recursoId;
        notificacion.tiempoDedicado = this.nuevoNotificacion.tiempoDedicado;

        this.indexedDbService
          .updateNotificacion(notificacion)
          .then(() => {
            console.log('Notificacion actualizada exitosamente');
            this.messageService.add({
              severity: 'success',
              summary: 'Exito',
              detail: 'Notificacion actualizada exitosamente',
            });
            this.obtenerNotificaciones();
          })
          .catch((error) => {
            console.error('Error al actualizar notificacion', error);
            this.messageService.add({
              severity: 'error',
              summary: error.name,
              detail: 'Error al actualizar notificacion',
            });
            this.obtenerNotificaciones();
          });
      })
      .catch((error) => {
        console.error(
          'Error al obtener notificacion para actualización',
          error
        );
        this.messageService.add({
          severity: 'error',
          summary: error.name,
          detail: 'Error al obtener notificacion para actualización',
        });
        this.obtenerNotificaciones();
      });
  }

  eliminarNotificacion() {
    this.indexedDbService
      .deleteNotificacion(this.nuevoNotificacion.id)
      .then(() => {
        console.log('Notificacion eliminada exitosamente');
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Notificacion eliminada exitosamente',
        });
        this.obtenerNotificaciones();
      })
      .catch((error) => {
        console.error('Error al eliminar notificacion', error);
        this.messageService.add({
          severity: 'error',
          summary: error.name,
          detail: 'Error al eliminar notificacion',
        });
        this.obtenerNotificaciones();
      });
  }
}
