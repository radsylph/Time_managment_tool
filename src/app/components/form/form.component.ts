import {
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
  Input,
} from '@angular/core';
import { Tags } from '../../models/tag.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @ViewChild('form', { read: ElementRef, static: true }) form!: ElementRef;
  @ViewChildren('dynamicInputs', { read: ElementRef })
  dynamicInputs!: QueryList<ElementRef>;
  @Input() tags!: Tags[];
  pageInfo: string = '';
  pageTitle: string = '';

  test1() {
    this.dynamicInputs.forEach((input) => {
      console.log('ID:', input.nativeElement.id);
      console.log('Value:', input.nativeElement.value);
    });
  }

  test2() {
    console.log(this.form.nativeElement);
  }
}
