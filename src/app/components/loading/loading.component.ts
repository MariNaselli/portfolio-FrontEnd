import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  messages = [
    'Afilando los lápices virtuales... 📝',
    'Buscando la llave del ciberespacio... 🔑',
    'Reuniendo a los pixeles rebeldes... 🖌️',
    'Sincronizando con el universo... 🌌',
    'Dándole cuerda al reloj de arena digital... ⏳',
    'Teletransportando gatos cósmicos... 🐈‍⬛',
    'Atrapando mariposas de bytes... 🦋',
    'Preparando la fiesta de datos... 🎉',
    'Engrasando las ruedas del WiFi... 🛠️',
    'Consultando con el oráculo de la web... 🔮',
  ];
  currentMessage = '';

  ngOnInit(): void {
    this.changeMessage();
    setInterval(() => {
      this.changeMessage();
    }, 3000);
  }

  changeMessage(): void {
    const randomIndex = Math.floor(Math.random() * this.messages.length);
    this.currentMessage = this.messages[randomIndex];
  }
}
