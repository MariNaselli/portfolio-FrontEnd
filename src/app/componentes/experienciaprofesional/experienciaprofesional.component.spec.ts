import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaprofesionalComponent } from './experienciaprofesional.component';

describe('ExperienciaprofesionalComponent', () => {
  let component: ExperienciaprofesionalComponent;
  let fixture: ComponentFixture<ExperienciaprofesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienciaprofesionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienciaprofesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
