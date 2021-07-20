import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastNotificationService, ToastServicePosition, ToastServiceType } from '../../services/toast/toast-notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswFormGroup = new FormGroup({
    emailFormControl:new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private authFirestoreSv: AuthService,
    private toastNotificationSv: ToastNotificationService,
  ) { }

  ngOnInit(): void {
  }

  sendPasswordResetEmail(form: any) {

    this.authFirestoreSv.ForgotPassword(form.value.emailFormControl)
      .then(() => {
        form.reset();
        this.toastNotificationSv.showToast('Password reset email sent, check your inbox', ToastServiceType.success, ToastServicePosition.topCenter);
      })
      .catch((error: any) => {
        console.error(error);
        this.toastNotificationSv.showToast(error, ToastServiceType.danger, ToastServicePosition.topCenter);
      });

  }


}
