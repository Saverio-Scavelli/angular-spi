import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { tap,  } from 'rxjs';
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

    this.clienteService.getClientes().pipe(
      tap(
        
        clientes => {

          this.clientes = clientes;

          console.log('ClientesComponent: tap 3');
          clientes.forEach(cliente => {
            console.log(cliente.nombre);
          });
        }
      )
    ).subscribe( );

    // this.clienteService.getClientes().subscribe(
    //   clientes => this.clientes = clientes
    // );

  }

  // this.clienteService.getClientes().pipe(
  //   tap(clientes => {
  //     console.log('ClientesComponent: tap 3');
  //     clientes.forEach(cliente => {
  //       console.log(cliente.nombre);
  //     })
  //   }
  //   ).subscribe();
  

  delete (cliente: Cliente): void {
    Swal.fire({
      title: 'Está Seguro?',
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
