import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from '../services/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);


  rePasswordFormControl = new FormControl('', [
    Validators.required
  ]);


  matcher = new MyErrorStateMatcher();



  ngOnInit(): void {
  }

  signUp() {
    // this.emailFormControl.value;
    console.log(this.emailFormControl.value, this.passwordFormControl.value, this.rePasswordFormControl.value);
    this.authService.SignUp(this.emailFormControl.value, this.passwordFormControl.value);
  }


}
