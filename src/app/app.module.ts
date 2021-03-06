import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component ';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule,Routes } from '@angular/router';
import { FormComponent } from './clientes/form.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { LoginComponent } from './usuario/login.component';
import { AuthGuard } from './usuario/guards/auth.guard';
import { RoleGuard } from './usuario/guards/role.guard';
import{tokenInterceptor} from './usuario/interceptors/token.interceptor';
import{AuthInterceptor} from './usuario/interceptors/auth.interceptor';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



registerLocaleData(localeEs,'es');

const routes: Routes =[
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form/:id', component: FormComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}},
  {path: 'login', component: LoginComponent},
  {path: 'clientes/form', component: FormComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}},
  {path:'facturas/:id',component :  DetalleFacturaComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_USER'}},
  {path:'facturas/form/:clienteId',component :  FacturasComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,MatDatepickerModule, MatMomentDateModule,
    ReactiveFormsModule,MatAutocompleteModule,MatInputModule,MatFormFieldModule
  ],
  providers: [ClienteService, {provide: LOCALE_ID, useValue: 'es' },
  { provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
