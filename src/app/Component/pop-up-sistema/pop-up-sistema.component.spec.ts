import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpSistemaComponent } from './pop-up-sistema.component';

describe('PopUpSistemaComponent', () => {
  let component: PopUpSistemaComponent;
  let fixture: ComponentFixture<PopUpSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
