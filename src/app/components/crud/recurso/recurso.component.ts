import { Component } from '@angular/core';
import { IndexedDbService } from 'src/app/services/indexdb.service';
import { Recurso } from 'src/app/models/recurso.model';
import { MessageService } from 'primeng/api';
import { TablaComponent } from '../../tabla/tabla.component';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.css'],
  providers: [MessageService],
})
export class RecursoComponent {
  constructor(
    private indexedDbService: IndexedDbService,
    private messageService: MessageService
  ) {}

  nuevoRecurso: Recurso = { id: 0, nombre: '' };
  recursosMostrar: Recurso[] = [];

  ngOnInit(): void {
    this.obtenerRecursos();
  }

  agregarRecurso() {
    if (this.nuevoRecurso.nombre.trim() === '') {
      console.warn('Nombre de recurso vacío, no se agrega.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Nombre de recurso vacío, no se agrega.',
      });
      return;
    }

    if (this.nuevoRecurso.id === 0) {
      console.warn('ID de recurso vacío, no se agrega.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'ID de recurso vacío, no se agrega.',
      }); // Agrega un mensaje de error
      this.obtenerRecursos();
      return;
    }

    this.indexedDbService
      .addRecurso(this.nuevoRecurso)
      .then(() => {
        console.log('Recurso agregado exitosamente');
        this.messageService.add({
          severity: 'success',
          summary: 'Recurso Agregado',
          detail: 'Recurso agregado exitosamente.',
        }); // Agrega un mensaje de éxito
        this.nuevoRecurso = { id: 0, nombre: '' }; // Limpiar el formulario
        this.obtenerRecursos();
      })
      .catch((error) => {
        console.error('Error al agregar recurso', error);
        this.obtenerRecursos();
      });
  }

  obtenerRecursos() {
    this.indexedDbService
      .getAllRecursos()
      .then((recursos) => {
        console.log('Recursos obtenidos:', recursos);
        this.recursosMostrar = recursos;
      })
      .catch((error) => {
        console.error('Error al obtener recursos', error);
      });
  }

  actualizarRecurso() {
    if (this.nuevoRecurso.id === 0) {
      console.warn('ID de recurso vacío, no se agrega.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'ID de recurso vacío, no se agrega.',
      });
      this.obtenerRecursos();
      return;
    }
    this.indexedDbService
      .getRecurso(this.nuevoRecurso.id)
      .then((recurso) => {
        if (!recurso) {
          console.warn(`Recurso con ID ${this.nuevoRecurso.id} no encontrado.`);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Recurso con ID ${this.nuevoRecurso.id} no encontrado.`,
          });
          this.obtenerRecursos();
          return;
        }

        recurso.nombre = this.nuevoRecurso.nombre; // Cambia el nombre a lo que necesites

        this.indexedDbService
          .updateRecurso(recurso)
          .then(() => {
            console.log('Recurso actualizado exitosamente');
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Recurso actualizado exitosamente',
            });
            this.obtenerRecursos();
          })
          .catch((error) => {
            console.error('Error al actualizar recurso', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al actualizar recurso',
            });
            this.obtenerRecursos();
          });
      })
      .catch((error) => {
        console.error('Error al obtener recurso para actualización', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener recurso para actualización',
        });
        this.obtenerRecursos();
      });
  }

  eliminarRecurso() {
    this.indexedDbService
      .deleteRecurso(this.nuevoRecurso.id)
      .then(() => {
        console.log('Recurso eliminado exitosamente');
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Recurso eliminado exitosamente',
        });
        this.obtenerRecursos();
      })
      .catch((error) => {
        console.error('Error al eliminar recurso', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al eliminar recurso',
        });
        this.obtenerRecursos();
      });
  }

  verRecurso(id: number) {
    this.indexedDbService
      .getRecurso(id)
      .then((recurso) => {
        if (!recurso) {
          console.warn(`Recurso con ID ${this.nuevoRecurso.id} no encontrado.`);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Recurso con ID ${this.nuevoRecurso.id} no encontrado.`,
          });
          return;
        }
        this.nuevoRecurso = recurso;
      })
      .catch((error) => {
        console.error('Error al obtener recurso para actualización', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener recurso para actualización',
        });
      });
  }
}
