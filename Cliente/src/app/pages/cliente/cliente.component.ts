import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: any[] = []; // Arreglo para almacenar los datos de los clientes

  constructor(private clienteServicio: ClienteService) { }

  ngOnInit(): void {
    this.obtenerClientes(); // Llama al método obtenerClientes() cuando el componente se inicie
  }

  obtenerClientes() {
    this.clienteServicio.getClientes().subscribe(
      (data: any) => {
        // Verifica si data es un arreglo o un objeto
        if (Array.isArray(data)) {
          // Si es un arreglo, asigna directamente
          this.clientes = data;
        } else {
          // Si es un objeto, intenta convertirlo a un arreglo
          this.clientes = [data];
        }
      },
      (error) => {
        console.log('Error al obtener los datos de los clientes:', error);
        alert('Hubo un error al obtener los datos de los clientes.');
      }
    );
  }

}
