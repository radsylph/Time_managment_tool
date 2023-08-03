import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  @Output() tablaSeleccionada = new EventEmitter<string>(); // Emitir evento al seleccionar una tabla

  tablaActual: string = '';
  tablas: string[] = [
    'Seleccionar Tabla',
    'Recurso',
    'Proyecto',
    'Notificacion',
  ];
  // tablas: object[] = [
  //   { name: 'Seleccionar Tabla', code: '' },
  //   { name: 'Recurso', code: 'recurso' },
  //   { name: 'Proyecto', code: 'proyecto' },
  //   { name: 'Notificacion', code: 'notificacion' },
  // ];
  cambiarTabla() {
    if (this.tablaActual) {
      this.tablaSeleccionada.emit(this.tablaActual); // Emitir el evento con la tabla seleccionada
      console.log('Tabla seleccionada:', this.tablaActual);
    }
  }
}
