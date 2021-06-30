import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  routeToLogin(){
    this.router.navigate(['login']);
  }
  routeToSignin(){
    this.router.navigate(['signin']);
  }
  
  logout(){
    this.router.navigate(['login']);
  }
}
