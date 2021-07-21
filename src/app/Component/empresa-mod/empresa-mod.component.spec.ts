import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaModComponent } from './empresa-mod.component';

describe('EmpresaModComponent', () => {
  let component: EmpresaModComponent;
  let fixture: ComponentFixture<EmpresaModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaModComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
