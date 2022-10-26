import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnIngresarComponent } from './btn-ingresar.component';

describe('BtnIngresarComponent', () => {
  let component: BtnIngresarComponent;
  let fixture: ComponentFixture<BtnIngresarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnIngresarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
