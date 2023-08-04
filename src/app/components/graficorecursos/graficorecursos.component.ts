import { Component } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto.model';
import { Notificacion } from 'src/app/models/notificacion.model';
import { Recurso } from 'src/app/models/recurso.model';
import { IndexedDbService } from 'src/app/services/indexdb.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-graficorecursos',
  templateUrl: './graficorecursos.component.html',
  styleUrls: ['./graficorecursos.component.css'],
})
export class GraficorecursosComponent {
  data: any;
  options: any;
  menuItems: Proyecto[] | undefined;
  selectedTable: Proyecto | undefined;
  notificaciones: Notificacion[] | undefined;
  recursos: Recurso[] | undefined;
  grafico: string | undefined;

  constructor(
    private indexedDbService: IndexedDbService,
    private route: ActivatedRoute
  ) {}

  getAllProyectos() {
    this.indexedDbService.getAllProyectos().then((proyectos: Proyecto[]) => {
      this.menuItems = proyectos;
    });
  }

  cambiarTabla() {
    if (this.selectedTable) {
      this.getAllNotificaciones();
    }
  }

  getAllRecursos() {
    this.indexedDbService.getAllRecursos().then((recursos: Recurso[]) => {
      if (this.notificaciones && this.notificaciones.length > 0) {
        const recursoIds = this.notificaciones.map(
          (notificacion) => notificacion.recursoId
        );
        const recursosFiltrados = recursos.filter((recurso) =>
          recursoIds.includes(recurso.id)
        );
        this.recursos = recursosFiltrados;
        this.updateChartData();
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
        this.getAllRecursos();
      });
  }

  updateChartData() {
    if (this.recursos && this.recursos.length > 0) {
      const labels = this.recursos.map((recurso) => recurso.nombre);
      const horasDedicadas = this.recursos.map(
        (recurso) =>
          this.notificaciones
            ?.filter((notificacion) => notificacion.recursoId === recurso.id)
            .reduce(
              (total, notificacion) => total + notificacion.tiempoDedicado,
              0
            ) || 0
      );
      const progresos = this.recursos.map(
        (recurso) =>
          this.notificaciones
            ?.filter((notificacion) => notificacion.recursoId === recurso.id)
            .reduce((total, notificacion) => total + notificacion.avance, 0) ||
          0
      );

      const color2: string = '#16C852';
      const color1: string = '#07114f';

      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'Horas Dedicadas',
            data: horasDedicadas,
            fill: true,

            backgroundColor: color2,
          },
          {
            label: 'Progreso',
            data: progresos,
            fill: true,

            backgroundColor: color1,
          },
        ],
      };
    }
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
        text: 'Gráfico de Horas Dedicadas y Progreso por Recurso',
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
