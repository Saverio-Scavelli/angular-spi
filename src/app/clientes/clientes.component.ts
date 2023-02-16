import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
     this.clienteService.getClientes().subscribe(
       (oclientes) => 
            {this.clientes = oclientes}
      );
  }

  delete (cliente: Cliente): void {
    Swal.fire({
      title: 'Está Geguro?',
      text: `Seguro que desea elemina el cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, aborralo!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
          })
        Swal.fire(
          'Deleted!',
          `el cliente ${cliente.nombre} ${cliente.apellido} has sido eliminado con éxito!`,
          'success'
        )
      }
    })
  }
}
