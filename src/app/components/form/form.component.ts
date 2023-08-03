import { Component, ViewChild } from '@angular/core';
import { IndexedDbService } from 'src/app/services/indexdb.service';
import { Recurso } from 'src/app/models/recurso.model';
import { InputTextModule } from 'primeng/inputtext';
import { SelectComponent } from '../select/select.component';
import { ActivatedRoute } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { Proyecto } from 'src/app/models/proyecto.model';
import { Notificacion } from 'src/app/models/notificacion.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @ViewChild(SelectComponent) selectComponent: SelectComponent | undefined;
  tablaActual: string = 'Recurso';
  Crud: string = '';
  nuevoRecurso: Recurso = { id: 0, nombre: '' };
  // manualId: number = 0; // Agregar esta variable para el ID manual
  nuevoProyecto: Proyecto = { id: 0, nombre: '', fechaInicio: new Date() };
  nuevoNotificacion: Notificacion = {
    id: 0,
    fecha: new Date(),
    proyectoId: 0,
    tiempoDedicado: 0,
    recursoId: 0,
    avance: 0,
  };
  constructor(
    private indexedDbService: IndexedDbService,
    private route: ActivatedRoute
  ) {
    this.indexedDbService.openDb('TMT', 1).then(() => {
      console.log('Base de datos abierta');
    });
  }

  ngOnInit() {
    // Leer los parámetros de ruta
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log('ID de ruta:', id);
      // Realiza cualquier acción que necesites con el ID
    });

    // Leer el fragmento de la URL
    this.route.fragment.subscribe((fragment) => {
      console.log('Fragmento:', fragment);
      // Realiza cualquier acción que necesites con el fragmento
    });
    this.Crud = this.route.snapshot.url.join('/');
    console.log('URL:', this.Crud);
  }

  // cambiarTabla(tabla: string) {
  //   console.log('Tabla seleccionada:', tabla);
  //   this.tablaActual = tabla; // Cambiar la tabla actual según la selección
  //   console.log(this.tablaActual);
  // }

  verDate() {
    console.log(this.nuevoProyecto.fechaInicio);
  }

  agregarRecurso() {
    if (this.nuevoRecurso.nombre.trim() === '') {
      console.warn('Nombre de recurso vacío, no se agrega.');
      return;
    }

    if (this.nuevoRecurso.id === 0) {
      console.warn('ID de recurso vacío, no se agrega.');
      return;
    }

    this.indexedDbService
      .addRecurso(this.nuevoRecurso)
      .then(() => {
        console.log('Recurso agregado exitosamente');
        this.nuevoRecurso = { id: 0, nombre: '' }; // Limpiar el formulario
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
    if (this.nuevoRecurso.id === 0) {
      console.warn('ID de recurso vacío, no se agrega.');
      return;
    }
    this.indexedDbService
      .getRecurso(this.nuevoRecurso.id)
      .then((recurso) => {
        if (!recurso) {
          console.warn(`Recurso con ID ${this.nuevoRecurso.id} no encontrado.`);
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
      .deleteRecurso(this.nuevoRecurso.id)
      .then(() => {
        console.log('Recurso eliminado exitosamente');
      })
      .catch((error) => {
        console.error('Error al eliminar recurso', error);
      });
  }

  agregarProyecto() {
    if (this.nuevoProyecto.nombre.trim() === '') {
      console.warn('Nombre de proyecto vacío, no se agrega.');
      return;
    }

    if (this.nuevoProyecto.id === 0) {
      console.warn('ID de recurso vacío, no se agrega.');
      return;
    }

    this.indexedDbService
      .addProyecto(this.nuevoProyecto)
      .then(() => {
        console.log('Proyecto agregado exitosamente');
        this.nuevoProyecto = { id: 0, nombre: '', fechaInicio: new Date() }; // Limpiar el formulario
      })
      .catch((error) => {
        console.error('Error al agregar proyecto', error);
      });
  }

  obtenerProyectos() {
    this.indexedDbService
      .getAllProyectos()
      .then((proyectos) => {
        console.log('Proyectos obtenidos:', proyectos);
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
          return;
        }

        proyecto.nombre = this.nuevoProyecto.nombre; // Cambia el nombre a lo que necesites

        this.indexedDbService
          .updateProyecto(proyecto)
          .then(() => {
            console.log('Proyecto actualizado exitosamente');
          })
          .catch((error) => {
            console.error('Error al actualizar proyecto', error);
          });
      })
      .catch((error) => {
        console.error('Error al obtener proyecto para actualización', error);
      });
  }

  eliminarProyecto() {
    this.indexedDbService
      .deleteProyecto(this.nuevoProyecto.id)
      .then(() => {
        console.log('Proyecto eliminado exitosamente');
      })
      .catch((error) => {
        console.error('Error al eliminar proyecto', error);
      });
  }

  agregarNotificacion() {
    if (this.nuevoNotificacion.id === 0) {
      console.warn('ID de notificacion vacío, no se agrega.');
      return;
    }
    if (this.nuevoNotificacion.recursoId === 0) {
      console.warn('ID de recurso vacío, no se agrega.');
      return;
    }
    if (this.nuevoNotificacion.proyectoId === 0) {
      console.warn('ID de proyecto vacío, no se agrega.');
      return;
    }
    if (this.nuevoNotificacion.tiempoDedicado === 0) {
      console.warn('Tiempo dedicado vacío, no se agrega.');
      return;
    }
    if (this.nuevoNotificacion.avance === 0) {
      console.warn('Avance vacío, no se agrega.');
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
      })
      .catch((error) => {
        console.error('Error al agregar notificacion', error);
      });
  }

  obtenerNotificaciones() {
    this.indexedDbService
      .getAllNotificaciones()
      .then((notificaciones) => {
        console.log('Notificaciones obtenidas:', notificaciones);
      })
      .catch((error) => {
        console.error('Error al obtener notificaciones', error);
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
          return;
        }

        notificacion.avance = this.nuevoNotificacion.avance; // Cambia el nombre a lo que necesites

        this.indexedDbService
          .updateNotificacion(notificacion)
          .then(() => {
            console.log('Notificacion actualizada exitosamente');
          })
          .catch((error) => {
            console.error('Error al actualizar notificacion', error);
          });
      })
      .catch((error) => {
        console.error(
          'Error al obtener notificacion para actualización',
          error
        );
      });
  }

  eliminarNotificacion() {
    this.indexedDbService
      .deleteNotificacion(this.nuevoNotificacion.id)
      .then(() => {
        console.log('Notificacion eliminada exitosamente');
      })
      .catch((error) => {
        console.error('Error al eliminar notificacion', error);
      });
  }
}
