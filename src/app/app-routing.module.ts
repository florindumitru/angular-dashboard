import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './core/account/account.component';
import { AdminDashboardComponent } from './core/admin-dashboard/admin-dashboard.component';
import { ChangePasswordComponent } from './core/auth/change-password/change-password.component';
import { FirebaseAdminAuthGuard } from './core/auth/guard/firebase-admin-auth.guard';
import { FirebaseAuthGuard } from './core/auth/guard/firebase-auth.guard';
import { LoginComponent } from './core/auth/login/login.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './core/auth/forgot-password/forgot-password.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: '', component: SidenavComponent,canActivate: [FirebaseAuthGuard],
    children: [
      {
        path:'dashboard', component: DashboardComponent,canActivate: [FirebaseAuthGuard]
      },
      {
        path:'admin-dashboard', component: AdminDashboardComponent,canActivate: [FirebaseAdminAuthGuard]
      },
      {
        path:'account', component: AccountComponent, canActivate: [FirebaseAuthGuard]
      },
      {
        path:'change-password', component: ChangePasswordComponent, canActivate: [FirebaseAuthGuard]
      },
      // { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
