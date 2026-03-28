import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InscriComponent } from './inscri/inscri.component';
import { ProfilComponent } from './profil/profil.component';

export const routes: Routes = [ 
      { path: 'login', component: LoginComponent },
  { path: 'inscri', component: InscriComponent },
  {path:'profil',component:ProfilComponent},
{ path: '', redirectTo: '/login', pathMatch: 'full' }
  
];
