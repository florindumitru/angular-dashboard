import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) { }

  public isLoggedIn:boolean = false;

  ngOnInit(): void {

    this.afAuth.onAuthStateChanged((user) => {
      if (user && user.uid) {
        this.isLoggedIn = true;
      }else {
        this.isLoggedIn = false;
      }
    });

    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    // if (user && user.uid) {
    //   this.isLoggedIn = true;
    // }else {
    //   this.isLoggedIn = false;
    // }
  }

  routeToLogin() {
    this.router.navigate(['login']);
  }
  routeToSignup() {
    this.router.navigate(['signup']);
  }


  logout() {
    this.authService.SignOut();
  }
}
