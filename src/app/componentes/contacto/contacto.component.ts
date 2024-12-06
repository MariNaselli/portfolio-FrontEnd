import { Component, Input, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/clases/portfolio';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent {
  @Input() portfolio: Portfolio = new Portfolio();
}
