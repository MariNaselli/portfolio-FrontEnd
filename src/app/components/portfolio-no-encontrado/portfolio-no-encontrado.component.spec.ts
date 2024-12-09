import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioNoEncontradoComponent } from './portfolio-no-encontrado.component';

describe('PortfolioNoEncontradoComponent', () => {
  let component: PortfolioNoEncontradoComponent;
  let fixture: ComponentFixture<PortfolioNoEncontradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioNoEncontradoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioNoEncontradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
