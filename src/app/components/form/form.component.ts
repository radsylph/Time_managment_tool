import { Component } from '@angular/core';
import { IndexedDbService } from 'src/app/services/indexdb.service';
import { ActivatedRoute } from '@angular/router';

import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [MessageService],
})
export class FormComponent {
  constructor(
    private indexedDbService: IndexedDbService,
    private route: ActivatedRoute
  ) {
    this.indexedDbService.openDb('TMT', 1).then(() => {
      console.log('Base de datos abierta');
    });
  }

  tablaActual: string = 'Recurso';
  Crud: string = '';

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log('ID de ruta:', id);
    });
    this.route.fragment.subscribe((fragment) => {
      console.log('Fragmento:', fragment);
    });
    this.Crud = this.route.snapshot.url.join('/');
    console.log('URL:', this.Crud);
  }
}
