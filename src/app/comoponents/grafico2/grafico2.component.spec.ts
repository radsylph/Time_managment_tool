import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Grafico2Component } from './grafico2.component';

describe('Grafico2Component', () => {
  let component: Grafico2Component;
  let fixture: ComponentFixture<Grafico2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Grafico2Component]
    });
    fixture = TestBed.createComponent(Grafico2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
