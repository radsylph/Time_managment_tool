import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficorecursosComponent } from './graficorecursos.component';

describe('GraficorecursosComponent', () => {
  let component: GraficorecursosComponent;
  let fixture: ComponentFixture<GraficorecursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficorecursosComponent]
    });
    fixture = TestBed.createComponent(GraficorecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
