import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpFirestoreService } from '../../services/http/http-firestore.service';
import { ToastNotificationService, ToastServicePosition, ToastServiceType } from '../../services/toast/toast-notification.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private authFirestoreSv: AuthService,
    private toastNotificationSv: ToastNotificationService,
  ) { }

  public changePasswFormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    confirmNewPassword: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {

  }

  changePassword(form: any) {
    console.log(form.value)
    if (form.value.newPassword === form.value.confirmNewPassword) {
      this.authFirestoreSv.changePassword(form.value.newPassword)
        .then(() => {
          form.reset();
        })
        .catch((error:any) => {
          console.error(error);
          this.toastNotificationSv.showToast(error, ToastServiceType.danger, ToastServicePosition.topCenter);
        });;
    } else {
      this.toastNotificationSv.showToast('Password differ', ToastServiceType.danger, ToastServicePosition.topCenter);
    }
  }

}
