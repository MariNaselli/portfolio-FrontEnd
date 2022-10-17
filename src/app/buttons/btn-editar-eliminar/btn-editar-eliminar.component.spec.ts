import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnEditarEliminarComponent } from './btn-editar-eliminar.component';

describe('BtnEditarEliminarComponent', () => {
  let component: BtnEditarEliminarComponent;
  let fixture: ComponentFixture<BtnEditarEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnEditarEliminarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnEditarEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
