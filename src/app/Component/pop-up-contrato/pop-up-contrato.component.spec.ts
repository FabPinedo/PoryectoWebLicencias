import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpContratoComponent } from './pop-up-contrato.component';

describe('PopUpContratoComponent', () => {
  let component: PopUpContratoComponent;
  let fixture: ComponentFixture<PopUpContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
