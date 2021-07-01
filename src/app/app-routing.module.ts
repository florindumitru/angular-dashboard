import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './core/account/account.component';
import { ChangePasswordComponent } from './core/auth/change-password/change-password.component';
import { LoginComponent } from './core/auth/login/login.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';

const routes: Routes = [
  // {
  //   path: '', redirectTo: 'login', pathMatch: 'full'
  // },
  {
    path: '', redirectTo: 'main', pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'main', component: SidenavComponent,
    children: [
      {
        path:'dashboard', component: DashboardComponent
      },
      {
        path:'account', component: AccountComponent
      },
      {
        path:'change-password', component: ChangePasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
