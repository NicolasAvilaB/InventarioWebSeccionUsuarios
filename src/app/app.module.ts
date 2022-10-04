import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './usuarios/form.component';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from './usuarios/usuario.service';
import { UsuariosModificarComponent } from './usuarios-modificar/usuarios-modificar.component';
import { FooterComponent } from './footer/footer.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: 'usuarios/crearusuario', component: FormComponent},
    {path: 'usuarios/modificar_usuario/:id', component: UsuariosModificarComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsuariosComponent,
    FormComponent,
    UsuariosModificarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    DragDropModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
