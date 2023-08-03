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

  agregarProyecto() {
    if (this.nuevoProyecto.nombre.trim() === '') {
      console.warn('Nombre de proyecto vacío, no se agrega.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Nombre de proyecto vacío, no se agrega.',
      });

      return;
    }

    if (this.nuevoProyecto.id === 0) {
      console.warn('ID de recurso vacío, no se agrega.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'ID de recurso vacío, no se agrega.',
      });

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
        }; // Limpiar el formulario
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Proyecto agregado exitosamente',
        });
        this.obtenerProyectos();
      })
      .catch((error) => {
        console.error('Error al agregar proyecto', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al agregar proyecto',
        });
        this.obtenerProyectos();
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
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Proyecto con ID ${this.nuevoProyecto.id} no encontrado.`,
          });
          this.obtenerProyectos();
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
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Proyecto eliminado exitosamente',
        });
        this.obtenerProyectos();
      })
      .catch((error) => {
        console.error('Error al eliminar proyecto', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al eliminar proyecto',
        });
        this.obtenerProyectos();
      });
  }
}
