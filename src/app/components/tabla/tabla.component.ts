import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent {
  @Input() recursos: object[] = [];

  getColumnKeys(): string[] {
    if (this.recursos && this.recursos.length > 0) {
      return Object.keys(this.recursos[0]);
    }
    return [];
  }
}
