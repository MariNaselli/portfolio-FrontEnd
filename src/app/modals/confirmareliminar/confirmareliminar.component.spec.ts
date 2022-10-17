import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmareliminarComponent } from './confirmareliminar.component';

describe('ConfirmareliminarComponent', () => {
  let component: ConfirmareliminarComponent;
  let fixture: ComponentFixture<ConfirmareliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmareliminarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmareliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
