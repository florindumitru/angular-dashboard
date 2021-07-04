import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private authFb: AuthService
  ) { }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('user') || '{}'));
  }

}
