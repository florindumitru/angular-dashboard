import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastNotificationService, ToastServicePosition } from '../../services/toast/toast-notification.service';
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

  mobileQuery!: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    public authService: AuthService,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private toastNotificationSv: ToastNotificationService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


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
    if (this.passwordFormControl.value !== this.rePasswordFormControl.value) {
      this.toastNotificationSv.showErrorToast('Passwords differ', ToastServicePosition.topCenter);
      return;
    }
    this.authService.SignUp(this.emailFormControl.value, this.passwordFormControl.value);
  }


}
