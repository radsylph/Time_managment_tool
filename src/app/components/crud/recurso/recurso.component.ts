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

  private showSuccessMessage(message: string) {
    console.log(message);
    this.messageService.add({
      severity: 'success',
      summary: 'Exito',
      detail: message,
      life: 3000,
    });
    this.obtenerRecursos();
  }

  private showErrorMessage(summary: string, detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
      life: 3000,
    });
    this.obtenerRecursos();
  }

  private handleError(error: any, summary: string, detail: string) {
    console.error(summary, error);
    this.showErrorMessage(error.name, detail);
    this.obtenerRecursos();
  }

  agregarRecurso() {
    if (this.nuevoRecurso.nombre.trim() === '' || this.nuevoRecurso.id === 0) {
      console.warn('Nombre de recurso vacío, no se agrega.');
      this.showErrorMessage('Error', 'el Id y el nombre son obligatorios');
      return;
    }

    this.indexedDbService
      .addRecurso(this.nuevoRecurso)
      .then(() => {
        console.log('Recurso agregado exitosamente');
        this.showSuccessMessage('Recurso agregado exitosamente');
        this.nuevoRecurso = { id: 0, nombre: '' }; // Limpiar el formulario
      })
      .catch((error) => {
        console.error('Error al agregar recurso', error);
        this.handleError(error, 'Error', 'Error al agregar recurso');
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
      this.showErrorMessage('error', 'el id de recurso es obligatorio');

      return;
    }
    this.indexedDbService
      .getRecurso(this.nuevoRecurso.id)
      .then((recurso) => {
        if (!recurso) {
          console.warn(`Recurso con ID ${this.nuevoRecurso.id} no encontrado.`);
          this.showErrorMessage(
            'error',
            `el recurso con id ${this.nuevoRecurso.id}`
          );
          return;
        }
        recurso.nombre = this.nuevoRecurso.nombre; // Cambia el nombre a lo que necesites
        this.indexedDbService
          .updateRecurso(recurso)
          .then(() => {
            console.log('Recurso actualizado exitosamente');
            this.showSuccessMessage('Recurso actualizado exitosamente');
          })
          .catch((error) => {
            console.error('Error al actualizar recurso', error);
            this.showErrorMessage('error', 'Error al actualizar recurso');
          });
      })
      .catch((error) => {
        console.error('Error al obtener recurso para actualización', error);
        this.showErrorMessage(
          'error',
          'Error al obtener recurso para actualización'
        );
      });
  }

  eliminarRecurso() {
    this.indexedDbService
      .deleteRecurso(this.nuevoRecurso.id)
      .then(() => {
        console.log('Recurso eliminado exitosamente');
        this.showSuccessMessage('Recurso eliminado exitosamente');
      })
      .catch((error) => {
        console.error('Error al eliminar recurso', error);
        this.showErrorMessage('error', 'Error al eliminar recurso');
        this.obtenerRecursos();
      });
  }

  verRecurso(id: number) {
    this.indexedDbService
      .getRecurso(id)
      .then((recurso) => {
        if (!recurso) {
          console.warn(`Recurso con ID ${this.nuevoRecurso.id} no encontrado.`);
          this.showErrorMessage(
            'error',
            `el recurso con id ${this.nuevoRecurso.id}`
          );
          return;
        }
        this.nuevoRecurso = recurso;
      })
      .catch((error) => {
        console.error('Error al obtener recurso para actualización', error);
        this.showErrorMessage(
          'error',
          'Error al obtener recurso para actualización'
        );
      });
  }
}
