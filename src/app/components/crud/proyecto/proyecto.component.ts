import { Component } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto.model';
import { IndexedDbService } from 'src/app/services/indexdb.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
})
export class ProyectoComponent {
  constructor(
    private indexedDbService: IndexedDbService,
    private messageService: MessageService
  ) {}
  nuevoProyecto: Proyecto = {
    id: 0,
    nombre: '',
    fechaInicio: new Date(),
    progreso: 0,
  };

  recursosMostrar: Proyecto[] = [];

  ngOnInit(): void {
    this.obtenerProyectos();
  }

  private showSuccessMessage(message: string) {
    console.log(message);
    this.messageService.add({
      severity: 'success',
      summary: 'Exito',
      detail: message,
      life: 3000,
    });
    this.obtenerProyectos();
  }

  private showErrorMessage(summary: string, detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
      life: 3000,
    });
    this.obtenerProyectos();
  }

  private handleError(error: any, summary: string, detail: string) {
    console.error(summary, error);
    this.showErrorMessage(error.name, detail);
    this.obtenerProyectos();
  }

  agregarProyecto() {
    if (
      this.nuevoProyecto.nombre.trim() === '' ||
      this.nuevoProyecto.id === 0
    ) {
      console.warn('No se puede agregar un proyecto sin nombre o id');
      this.showErrorMessage(
        'Error',
        'No se puede agregar un proyecto sin nombre o id'
      );
      return;
    }

    this.indexedDbService
      .addProyecto(this.nuevoProyecto)
      .then(() => {
        console.log('Proyecto agregado exitosamente');
        this.nuevoProyecto = {
          id: 0,
          nombre: '',
          fechaInicio: new Date(),
          progreso: 0,
        };
        this.showSuccessMessage('Proyecto agregado exitosamente');
      })
      .catch((error) => {
        console.error('Error al agregar proyecto', error);
        this.handleError(error, 'Error al agregar proyecto', error.message);
      });
  }

  obtenerProyectos() {
    this.indexedDbService
      .getAllProyectos()
      .then((proyectos) => {
        console.log('Proyectos obtenidos:', proyectos);
        this.recursosMostrar = proyectos;
      })
      .catch((error) => {
        console.error('Error al obtener proyectos', error);
        this.handleError(error, 'Error al obtener proyectos', error.message);
      });
  }

  actualizarProyecto() {
    this.indexedDbService
      .getProyecto(this.nuevoProyecto.id)
      .then((proyecto) => {
        if (!proyecto) {
          console.warn(
            `Proyecto con ID ${this.nuevoProyecto.id} no encontrado.`
          );
          this.showErrorMessage(
            'Error',
            `Proyecto con ID ${this.nuevoProyecto.id} no encontrado.`
          );
          return;
        }

        proyecto.nombre = this.nuevoProyecto.nombre; // Cambia el nombre a lo que necesites

        this.indexedDbService
          .updateProyecto(proyecto)
          .then(() => {
            console.log('Proyecto actualizado exitosamente');
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Proyecto actualizado exitosamente',
            });
            this.obtenerProyectos();
          })
          .catch((error) => {
            console.error('Error al actualizar proyecto', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al actualizar proyecto',
            });
          });
      })
      .catch((error) => {
        console.error('Error al obtener proyecto para actualización', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener proyecto para actualización',
        });
      });
  }

  eliminarProyecto() {
    this.indexedDbService
      .deleteProyecto(this.nuevoProyecto.id)
      .then(() => {
        console.log('Proyecto eliminado exitosamente');
        this.showSuccessMessage('Proyecto eliminado exitosamente');
      })
      .catch((error) => {
        console.error('Error al eliminar proyecto', error);
        this.handleError(error, 'Error al eliminar proyecto', error.message);
      });
  }
}
