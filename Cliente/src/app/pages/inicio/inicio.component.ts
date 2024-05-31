import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/enviroment/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  clientes: Cliente[] = [];
  cliente: Cliente = {} as Cliente; // Inicializar la variable cliente
  clienteForm: FormGroup;
  codigos?: number;

  constructor(private clientesService: ClienteService, private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.clienteForm = this.fb.group({
      codigo: ['', Validators.required],
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClientes();
    const codigoParam = this.route.snapshot.paramMap.get('codigo');
    if (codigoParam !== null) {
      this.codigos = +codigoParam;
      if (this.codigos) {
        this.clientesService.getCliente(this.codigos).subscribe((data: Cliente) => {
          this.clienteForm.patchValue(data);
        });
      }
    } else {
      this.codigos = 0; // O cualquier valor por defecto que consideres apropiado
    }
  }

  loadClientes(): void {
    this.clientesService.getClientes().subscribe((data: Cliente[]) => {
      this.clientes = data;
    });
  }

  deleteAuto(codigo: number | undefined): void {
    this.clientesService.borrarCliente(codigo).subscribe(data => {
      this.loadClientes();
      console.log(data);
    });
  }

  add(): void {
    this.clientesService.agregarCliente(this.cliente).subscribe(data => {
      console.log(data);
      location.reload();
    });
  }

  update(): void {
    this.clientesService.actualizarCliente(this.cliente).subscribe(data => {
      console.log(data);
      location.reload();
    });
  }

  selected(numero: any): void {
    this.clientesService.getCliente(numero).subscribe(data => {
      console.log(data);
      this.cliente = data;
    });
  }
}
