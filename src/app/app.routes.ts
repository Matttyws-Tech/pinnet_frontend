import { Routes } from '@angular/router';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { GenerarPinComponent } from './modulos/gestion-pines/generar-pin/generar-pin.component';
import { RegistroPinesComponent } from './modulos/gestion-pines/registro-pines/registro-pines.component';
import { PinesEnUsoComponent } from './modulos/gestion-pines/pines-en-uso/pines-en-uso.component';
import { PinesEnRouterComponent } from './modulos/gestion-pines/pines-en-router/pines-en-router.component';
import { TablaUsuariosComponent } from './modulos/gestion-usuarios/tabla-usuarios/tabla-usuarios.component';
import { RegistrarUsuarioComponent } from './modulos/gestion-usuarios/registrar-usuario/registrar-usuario.component';
import { LoginComponent } from './modulos/login/login.component';
import { EstructuraPrincipalComponent } from './modulos/estructura-principal/estructura-principal.component';
import { validaruserGuard } from './guard/validaruser.guard';

export const routes: Routes = [
    {
        path: 'login', component:LoginComponent
    },
    {
        path: '', component:EstructuraPrincipalComponent,
        children:[
            {
                path: '', component:DashboardComponent, canActivate: [validaruserGuard]
            },
            {
                path:'generar-pin', component:GenerarPinComponent, canActivate: [validaruserGuard]        
            },
            {
                path:'registro-pines', component:RegistroPinesComponent, canActivate: [validaruserGuard]
            },
            {
                path:'pines-en-uso', component:PinesEnUsoComponent, canActivate: [validaruserGuard]
            },
            {
                path:'pines-router', component:PinesEnRouterComponent, canActivate: [validaruserGuard]
            },
            {
                path:'usuarios', component:TablaUsuariosComponent, canActivate: [validaruserGuard]
            },
            {
                path:'registrar-usuario', component:RegistrarUsuarioComponent, canActivate: [validaruserGuard]
            },
            
        ]
    },
    {
        path:'**', component:LoginComponent
    }
];
