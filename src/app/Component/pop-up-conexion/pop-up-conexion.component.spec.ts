import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpConexionComponent } from './pop-up-conexion.component';

describe('PopUpConexionComponent', () => {
  let component: PopUpConexionComponent;
  let fixture: ComponentFixture<PopUpConexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpConexionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpConexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
