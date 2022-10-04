import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-usuarios-modificar',
  templateUrl: './usuarios-modificar.component.html',
  styleUrls: ['./usuarios-modificar.component.css']
})
export class UsuariosModificarComponent implements OnInit {
  usuarios?: Usuario[];
  public passwencr: any;
  public disableid!: boolean;
  public cambiotipoclave: string = "password";
  public usuario: Usuario = new Usuario();
  public titulo: string = 'Modificar Usuario';
  constructor(private usuarioService: UsuarioService,
  private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuario();
    this.disableid = true;
  }

  @ViewChild('id_usuario') id_usuario!:ElementRef<HTMLInputElement>;
  @ViewChild('nombre') nombre!:ElementRef<HTMLInputElement>;
  @ViewChild('clave') clave!:ElementRef<HTMLInputElement>;

  veclave():void{
    if (this.cambiotipoclave == "password"){
      this.cambiotipoclave = "text";
    }else{
      this.cambiotipoclave = "password";
    }
  }

  cargarUsuario(): void {
    this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
        if (id) {
            this.usuarioService.getUsuarios(id).subscribe( (usuario) => this.usuario = usuario);
        }
    })
  }

  public update(): void {
      const valor_id_usuario = this.id_usuario.nativeElement.value;
      const valor_nombre = this.nombre.nativeElement.value;
      const valor_clave = this.clave.nativeElement.value;
      if (valor_nombre.trim().length===0){
        Swal.fire('Houston tenemos una Advertencia', `Se olvido de escribir el nombre de usuario`, 'warning');
      }else if (valor_clave.trim().length === 0){
        Swal.fire('Houston tenemos otra Advertencia', `Compa falta la Clave, escribala e intentelo denuevo`, 'warning');
      }else if (this.usuario.authority === '0'){
        Swal.fire('Wow! otra Advertencia', `Seleccione el Rol para el Usuario: ${this.usuario.nombre} `, 'warning');
      }else if (valor_nombre.trim().length > 100){
        Swal.fire('Vaya o_0!', `El nombre no puede sobrepasarse de 100 letras o números`, 'warning');
      }else if (valor_clave.trim().length > 200){
        Swal.fire('UPS!, Detalle de Clave o_0', `La Clave no puede sobrepasarse de 200 letras o números`, 'warning');
      }else if (valor_id_usuario.trim().length===0){
        Swal.fire('Chanfle! el ID o_0', `Creo que no se ha cargado el ID, Se cargara en un momento...`, 'warning');
        this.usuarioService.getIdUsuario().subscribe( (usuario) => this.usuario.id = usuario.id);
        this.usuarioService.getIdUsuario().subscribe( (usuario) => this.usuario.user_id = usuario.user_id);
      }else{
        const salt = bcrypt.genSaltSync(10);
        const pass = bcrypt.hashSync(this.usuario.clave, salt);
        this.usuario.clave = pass;
        this.usuarioService.update(this.usuario)
        .subscribe(usuario => {
          Swal.fire({
            title: 'Felicitaciones',
            text: `El Usuario ${usuario.nombre} ha sido Modificado`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/'])
              .then(() => {
                window.location.reload();
              });
            }
          })
        })
    }
  }

}
