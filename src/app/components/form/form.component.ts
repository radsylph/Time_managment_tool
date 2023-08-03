import { Component, ViewChild } from '@angular/core';
import { IndexedDbService } from 'src/app/services/indexdb.service';
import { Recurso } from 'src/app/models/recurso.model';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  nuevoRecurso: Recurso = { id: 0, nombre: '' };
  manualId: number = 0; // Agregar esta variable para el ID manual
  constructor(private indexedDbService: IndexedDbService) {
    this.indexedDbService.openDb('TMT', 1).then(() => {
      console.log('Base de datos abierta');
    });
  }

  agregarRecurso() {
    if (this.nuevoRecurso.nombre.trim() === '') {
      console.warn('Nombre de recurso vacío, no se agrega.');
      return;
    }

    if (this.manualId === 0) {
      console.warn('ID de recurso vacío, no se agrega.');
      return;
    }

    this.nuevoRecurso.id = this.manualId; // Asignar el ID manual

    this.indexedDbService
      .addRecurso(this.nuevoRecurso)
      .then(() => {
        console.log('Recurso agregado exitosamente');
        this.nuevoRecurso = { id: 0, nombre: '' }; // Limpiar el formulario
        this.manualId = 0; // Limpiar el ID manual
      })
      .catch((error) => {
        console.error('Error al agregar recurso', error);
      });
  }

  obtenerRecursos() {
    this.indexedDbService
      .getAllRecursos()
      .then((recursos) => {
        console.log('Recursos obtenidos:', recursos);
      })
      .catch((error) => {
        console.error('Error al obtener recursos', error);
      });
  }

  actualizarRecurso() {
    if (this.manualId === 0) {
      console.warn('ID de recurso vacío, no se agrega.');
      return;
    }
    this.indexedDbService
      .getRecurso(this.manualId)
      .then((recurso) => {
        if (!recurso) {
          console.warn(`Recurso con ID ${this.manualId} no encontrado.`);
          return;
        }

        recurso.nombre = this.nuevoRecurso.nombre; // Cambia el nombre a lo que necesites

        this.indexedDbService
          .updateRecurso(recurso)
          .then(() => {
            console.log('Recurso actualizado exitosamente');
          })
          .catch((error) => {
            console.error('Error al actualizar recurso', error);
          });
      })
      .catch((error) => {
        console.error('Error al obtener recurso para actualización', error);
      });
  }

  eliminarRecurso() {
    this.indexedDbService
      .deleteRecurso(this.manualId)
      .then(() => {
        console.log('Recurso eliminado exitosamente');
      })
      .catch((error) => {
        console.error('Error al eliminar recurso', error);
      });
  }
}
