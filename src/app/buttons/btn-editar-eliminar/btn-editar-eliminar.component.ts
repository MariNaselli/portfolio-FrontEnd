import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-btn-editar-eliminar',
  templateUrl: './btn-editar-eliminar.component.html',
  styleUrls: ['./btn-editar-eliminar.component.scss']
})
export class BtnEditarEliminarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  confirmarEliminar(){
    Swal
      .fire({
        title: '¡Atención!',
        text: '¿Estás seguro de que quieres eliminar esta tarea?',
        icon: 'warning',
        confirmButtonText: 'Sí, eliminar!',
        confirmButtonColor: 'red',
        showCancelButton: true,
        cancelButtonText: 'No, cancelar',
        cancelButtonColor: 'grey',
      })
      .then((swal_result) => {
        if (swal_result.isConfirmed) {
          //LLAMAMOS AL SERVICIO PARA ELIMINAR LA TAREA
          //this.OnDeleteTask.emit(task);
          console.log("Eliminar")

          //MOSTRAMOS UN MENSAJE AL USUARIO INFORMANDO QUE SE ELIMINÓ CORRECTAMENTE
          Swal.fire({
            title: '¡Información!',
            text: 'Se eliminó la tarea correctamente',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'green',
          });
        }
      });
  }
}
