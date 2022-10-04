import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios?: Usuario[];
  private usuario: Usuario = new Usuario();
  title = 'Listado';
  visible: boolean = false;

  constructor(private usuarioService: UsuarioService,
    private router: Router, private appComponent: AppComponent) {  }

  ngOnInit(): void {
      this.usuarioService.getUsuario().subscribe(
          usuarios => this.usuarios = usuarios
      );
  }

  @ViewChild('modal') modal!:ElementRef<HTMLInputElement>;
  ver():void{
    this.visible = ! this.visible;
  }

  delete(usuario: Usuario): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
        title: 'Eliminar Usuario',
        text: `¿Desea eliminar el Usuario ${usuario.nombre}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cd149',
        cancelButtonColor: '#434CF0',
        showCloseButton: true,
        confirmButtonText: 'Si, borrelo!',
        cancelButtonText: 'No, gracias no me interesa!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.delete(usuario.id).subscribe(
            response => {
              this.usuarios = this.usuarios?.filter(usu => usu !== usuario);
              swalWithBootstrapButtons.fire(
                'Felicidades lo ha logrado!',
                `El Usuario ha sido eliminado exitosamente`,
                'success'
              )
              this.router.navigate(['']);
            }
          )
      }
    })
  }
}
