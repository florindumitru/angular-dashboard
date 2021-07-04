import { Injectable } from '@angular/core';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { ToastPosition } from 'ngx-toast-notifications/toast-notifications.config';


export enum ToastServiceType {
  success= 'success',
  danger = 'danger',
  warning = 'warning',
  info = 'info',
  dark = 'dark'
}

export enum ToastServicePosition {
  topLeft= 'top-left',
  topCenter = 'top-center',
  topRight = 'top-right',
  bottomLeft = 'bottom-left',
  bottomCenter = 'bottom-center'
}

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {

  private types: Array<ToastType> = ['success', 'danger', 'warning', 'info', 'primary', 'secondary', 'dark', 'light'];

  private positions: Array<ToastPosition> = ['top-left' , 'top-center' , 'top-right' , 'bottom-left' , 'bottom-center' , 'bottom-right'];



  constructor(private toaster: Toaster) { }

  toastSuccessTopCenter(){

  }


  showToast(message: string, type: ToastServiceType, position:ToastServicePosition) {
    this.toaster.open({
      text: message,
      caption: type,
      type: type,
      position: position
    });
  }

  showErrorToast(message: string, position:ToastServicePosition) {
    this.toaster.open({
      text: message,
      caption: ToastServiceType.danger,
      type: ToastServiceType.danger,
      position: position
    });
  }

}
