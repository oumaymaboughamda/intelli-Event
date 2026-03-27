import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistreComponent } from './registre/registre.component';

export const routes: Routes = [
   { path: 'login',component:LoginComponent },
   {path:'registre',component:RegistreComponent},
   {path:'',component:LoginComponent}
];
