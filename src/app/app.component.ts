import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { FormComponent } from './components/form/form.component';
import { Tags } from './models/tag.model';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Time_managment_tool';
  tags: Tags[] = [];
  context: Tags[] = [];

  // menuItems: object[] = [
  //   { label: 'Recurso', routerLink: 'recurso' },
  //   { label: 'Proyecto', routerLink: 'proyecto' },
  //   { label: 'Notificación', routerLink: 'notificacion' },
  // ];

  menuItems: MenuItem[] | undefined;

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Administrar Activos',
        icon: 'pi pi-file',
        items: [
          { label: 'Recursos', icon: 'pi pi-user', routerLink: 'recurso' },
          {
            label: 'Proyectos',
            icon: 'pi pi-briefcase',
            routerLink: 'proyecto',
          },
          {
            label: 'Notificaciones',
            icon: 'pi pi-bell',
            routerLink: 'notificacion',
          },
        ],
      },
      { label: 'Ver progreso', icon: 'pi pi-search', items: [
        { label: 'Proyectos', icon: 'pi pi-briefcase', routerLink: 'progreso' },
      ] },
    ];
  }

  changeForm() {
    // this.context = [
    //   { name: 'nombre', element: 'input', id: 'id1', type: 'text' },
    //   { name: 'apellido', element: 'input', id: 'id2', type: 'text' },
    //   { name: 'edad', element: 'input', id: 'id3', type: 'number' },
    //   { name: 'fecha', element: 'input', id: 'id4', type: 'date' },
    //   {
    //     name: 'nose',
    //     element: 'input',
    //     id: 'id5 ',
    //     type: 'submit',
    //   },
    // ];
    // this.tags = this.context;
  }
}
