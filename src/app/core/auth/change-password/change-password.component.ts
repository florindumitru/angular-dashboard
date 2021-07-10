import { Component, OnInit } from '@angular/core';
import { HttpFirestoreService } from '../../services/http/http-firestore.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private httpFirestoreSv: HttpFirestoreService
  ) { }

  ngOnInit(): void {
  }

}
