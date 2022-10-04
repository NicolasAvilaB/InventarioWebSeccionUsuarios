import { Injectable } from '@angular/core';
import { USUARIOS } from './usuario.json';
import { Usuario } from './usuario';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEndPoint: string ='http://localhost:8087/usuarios/users';
  private urlEndPointmod: string ='http://localhost:8087/usuarios/usersmod';
  private urlEndPointID: string ='https://manqueinventa.cf/consultar_id_usuario_inventario_manque/consultar_id.php';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getUsuario(): Observable <Usuario[]>{
      return this.http.get<Usuario[]>(this.urlEndPoint);//.pipe(map((response) => response as Usuario[]))
  }

  getIdUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(this.urlEndPointID);
  }

  crear(usuario: Usuario): Observable<Usuario> {
    return this.http.post(this.urlEndPoint, usuario, {headers: this.httpHeaders});
  }

  getUsuarios(id: number): Observable <Usuario> {
      return this.http.get<Usuario>(`${this.urlEndPointmod}/${id}`);
  }

  update(usuario: Usuario): Observable <Usuario> {
    return this.http.put<Usuario>(`${this.urlEndPointmod}/${usuario.id}`, usuario, {headers: this.httpHeaders});
  }

  delete(id?: number): Observable <Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders});
  }

}
