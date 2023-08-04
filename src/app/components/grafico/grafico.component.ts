import { Component } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto.model';
import { Notificacion } from 'src/app/models/notificacion.model';
import { Message, MessageService } from 'primeng/api';
import { IndexedDbService } from 'src/app/services/indexdb.service';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Recurso } from 'src/app/models/recurso.model';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css'],
})
export class GraficoComponent {
  data: any;
  options: any;
  menuItems: Proyecto[] | undefined;
  selectedTable: Proyecto | undefined;
  notificaciones: Notificacion[] | undefined;
  grafico: string | undefined;
  recursos: Recurso[] | undefined;

  constructor(
    private indexedDbService: IndexedDbService,
    private route: ActivatedRoute
  ) {}

  getAllProyectos() {
    this.indexedDbService.getAllProyectos().then((proyectos: Proyecto[]) => {
      console.log(proyectos);

      this.menuItems = proyectos; // Corregir aquí
      console.log(this.menuItems);
      console.log(this.selectedTable);
    });
  }
  cambiarTabla() {
    if (this.selectedTable) {
      console.log('Tabla seleccionada:', this.selectedTable);
      this.getAllNotificaciones();
    }
  }

  getAllRecursos() {
    this.indexedDbService.getAllRecursos().then((recursos: Recurso[]) => {
      console.log(recursos);

      if (this.notificaciones && this.notificaciones.length > 0) {
        // Obtener los ids de los recursos desde las notificaciones
        const recursoIds = this.notificaciones.map(
          (notificacion) => notificacion.recursoId
        );

        const recursosFiltrados = recursos.filter((recurso) =>
          recursoIds.includes(recurso.id)
        );

        this.recursos = recursosFiltrados;
        console.log(this.recursos);
      }
    });
  }

  getAllNotificaciones() {
    this.indexedDbService
      .getAllNotificaciones()
      .then((notificaciones: Notificacion[]) => {
        const notificacionesFiltradas = notificaciones.filter(
          (notificacion) => notificacion.proyectoId === this.selectedTable?.id
        );
        this.notificaciones = notificacionesFiltradas;

        // Calcular las horas dedicadas y el progreso acumulado
        let tiempoDedicadoAcumulado = 0;
        const progresoAcumulado = [];

        for (const notificacion of notificacionesFiltradas) {
          tiempoDedicadoAcumulado += notificacion.tiempoDedicado;
          progresoAcumulado.push(tiempoDedicadoAcumulado);
        }

        // Actualizar la gráfica con los datos calculados
        this.data = {
          labels: [
            ...notificacionesFiltradas.map((notificacion) =>
              notificacion.fecha.toLocaleDateString()
            ),
          ],
          datasets: [
            {
              label: 'Progreso Acumulado',
              data: progresoAcumulado,
              fill: true,
              borderColor: '#4bc0c0',
            },
            {
              label: 'Horas Dedicadas',
              data: notificacionesFiltradas.map(
                (notificacion) => notificacion.tiempoDedicado
              ),
              fill: false,
              borderColor: '#565656',
            },
          ],
        };
      });
  }

  test() {
    console.log(this.notificaciones);
  }
  getProyectoId(id: number): Promise<Proyecto> {
    return new Promise((resolve, reject) => {
      this.indexedDbService
        .getProyecto(id)
        .then((proyecto) => {
          if (!proyecto) {
            console.warn(`Proyecto con ID ${id} no encontrado.`);
            reject();
            return;
          }
          resolve(proyecto);
          console.log(proyecto);
        })
        .catch((error) => {
          console.error('Error al obtener proyecto', error);
          reject(error);
        });
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log('ID de ruta:', id);
    });
    this.route.fragment.subscribe((fragment) => {
      console.log('Fragmento:', fragment);
    });
    this.grafico = this.route.snapshot.url.join('/');
    console.log('URL:', this.grafico);

    this.getAllProyectos();
    this.data = {}; // Inicializar data vacío, lo actualizaremos en getAllNotificaciones

    this.options = {
      responsive: true,
      title: {
        display: true,
        text: 'Gráfico de barras',
      },
      scales: {
        xAxes: [
          {
            display: true,
          },
        ],
        yAxes: [
          {
            display: true,
          },
        ],
      },
    };
  }
}
