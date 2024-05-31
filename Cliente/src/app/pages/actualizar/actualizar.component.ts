import { Component } from '@angular/core';
import { Cliente } from 'src/app/enviroment/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent {
  cliente: Cliente = {}

  constructor( private clienteServicio: ClienteService) {}

  actualizarUsuario() {
    this.clienteServicio.actualizarCliente(this.cliente).subscribe(
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
