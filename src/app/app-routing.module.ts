import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';

const routes: Routes = [
  // {
  //   path: '', redirectTo: 'login', pathMatch: 'full'
  // },
  {
    path: '', redirectTo: 'main', pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: SidenavComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
