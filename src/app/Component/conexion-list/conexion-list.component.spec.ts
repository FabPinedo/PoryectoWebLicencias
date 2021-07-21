import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConexionListComponent } from './conexion-list.component';

describe('ConexionListComponent', () => {
  let component: ConexionListComponent;
  let fixture: ComponentFixture<ConexionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConexionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConexionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
