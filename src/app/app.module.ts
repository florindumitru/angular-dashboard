import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { CoreMaterialModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './core/auth/login/login.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { SideMenuComponent } from './core/side-menu/side-menu.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { AccountComponent } from './core/account/account.component';
import { ChangePasswordComponent } from './core/auth/change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    SignupComponent,
    SideMenuComponent,
    DashboardComponent,
    AccountComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreMaterialModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase, 'app-ipds'),
    AngularFirestoreModule, // Only required for database features
    AngularFireAuthModule, // Only required for auth features,
    AngularFireStorageModule // Only required for storage features
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
