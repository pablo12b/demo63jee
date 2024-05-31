import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/enviroment/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-recarga',
  templateUrl: './recarga.component.html',
  styleUrls: ['./recarga.component.css']
})
export class RecargaComponent {
  cliente: Cliente = {}

  constructor( private clienteServicio: ClienteService) {}

  enviarUsuario() {
    this.clienteServicio.agregarCliente(this.cliente).subscribe(
      (response) => {
        console.log('Usuario enviado con éxito:', response);
        // Aquí puedes manejar la respuesta del servidor si es necesario
      },
      (error) => {
        console.error('Error al enviar el usuario:', error);
        // Aquí puedes manejar el error si es necesario
      }
    );
  }

}
