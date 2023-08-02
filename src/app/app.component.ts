import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { FormComponent } from './components/form/form.component';
import { Tags } from './models/tag.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Time_managment_tool';
  tags: Tags[] = [
    { name: 'nombre', element: 'input', id: 'id1', type: 'text' },
    { name: 'apellido', element: 'input', id: 'id2', type: 'text' },
    { name: 'edad', element: 'input', id: 'id3', type: 'number' },
    { name: 'fecha', element: 'input', id: 'id4', type: 'date' },
    {
      name: 'nose',
      element: 'input',
      id: 'id5 ',
      type: 'submit',
    },
  ];
}
