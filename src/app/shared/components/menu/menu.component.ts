import { Component, OnInit } from '@angular/core';
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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
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
