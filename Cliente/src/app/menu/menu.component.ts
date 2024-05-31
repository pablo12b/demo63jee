import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  paginas = [
    {titulo: 'Cliente', path: 'paginas/cliente'},
    {titulo: 'Agregar', path: 'paginas/recarga'},
    {titulo: 'Actualizar', path: 'paginas/actualizar'},
    {titulo: 'Eliminar', path: 'paginas/eliminar'},
  ]
}
