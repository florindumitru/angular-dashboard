import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  isAdmin() {
    return this.auth.isAdmin();
  }
  
  routeToDashboard() {
    this.router.navigate(['main','dashboard']);
  }

  routeToAccount() {
    this.router.navigate(['main','account']);
  }

  routeToChangePass() {
    this.router.navigate(['main','change-password']);
  }

}
