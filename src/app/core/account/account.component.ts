import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public userEmail: string ='';
  public localDateStr: string = '';
  public localTimeStr: string = '';
  public lastLogin: string = '';
  public isAdmin: boolean = false;
  constructor(
    private authFb: AuthService
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    let datei = parseInt(user.lastLoginAt,10);
    let date = new Date(datei);
    this.userEmail = user.email;
    this.localDateStr =  date.toLocaleDateString();
    this.localTimeStr =  date.toLocaleTimeString();
    this.lastLogin  = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    this.isAdmin = this.authFb.isAdmin();
    // console.log(user);
    // console.log(user.email, date.toLocaleDateString(), date.toLocaleTimeString());


  }

}
