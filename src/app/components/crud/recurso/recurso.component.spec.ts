import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoComponent } from './recurso.component';

describe('RecursoComponent', () => {
  let component: RecursoComponent;
  let fixture: ComponentFixture<RecursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecursoComponent]
    });
    fixture = TestBed.createComponent(RecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
