import { HttpAdminFirestoreService } from './../../services/http/http-admin-firestore.service';
import { Injectable, NgZone } from '@angular/core';
import { User } from "../../../shared/models/user";
import auth from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { HttpFirestoreService } from '../../services/http/http-firestore.service';
import { UserDomains } from 'src/app/shared/models/user-domains';
import { ToastNotificationService, ToastServicePosition, ToastServiceType } from '../../services/toast/toast-notification.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public userData: any; // Save logged in user data
  public adminUid = "TFmyKHLmiMYOIEjPmbghgWmuEl13";

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private httpFirestoreSv: HttpFirestoreService,
    private httpAdminFirestoreSv: HttpAdminFirestoreService,
    private toastNotificationSv: ToastNotificationService,
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '');
      } else {
        localStorage.setItem('user', '');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    })
  }

  isAdmin() {
    if (this.userData && this.userData.uid === this.adminUid) {
      return true;
    }
    return false;
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result: { user: any; }) => {
        this.ngZone.run(() => {
          // this.router.navigate(['dashboard']);
          this.SetUserData(result.user)
          // .catch(error => {
          //   window.alert(error.message)
          // });
        });
        // console.log(result.user);
      }).catch((error: { message: any; }) => {
        this.toastNotificationSv.showErrorToast(error.message,ToastServicePosition.topCenter);
      })
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result: { user: any; }) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        // this.SendVerificationMail();
        // route to login
        result.user.sendEmailVerification();
        this.router.navigate(['login']);
        this.SetUserData(result.user);
      }).catch((error: { message: any; }) => {
        this.toastNotificationSv.showErrorToast(error.message,ToastServicePosition.topCenter);
      })
  }

  // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser.sendEmailVerification()
  //   .then(() => {
  //     this.router.navigate(['verify-email-address']);
  //   })
  // }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
  }

  // Returns true when user is looged in and email is verified
  // for now, not verifEmail... todo 
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // return (user !== null && user.emailVerified !== false) ? true : false;
    return (user !== null && user.uid) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    // return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then((result: { user: any; }) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        this.SetUserData(result.user);
      }).catch((error: any) => {
        this.toastNotificationSv.showErrorToast(error,ToastServicePosition.topCenter);
      })
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: { uid: any; email: any; displayName: any; photoURL: any; emailVerified: any; }) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
      .then(res => {
        this.router.navigate(['dashboard']);
        // console.log(res);
      })
      .catch((err: any) => {
        console.error(err);
      });

  }


  changePassword(newPassword: string) {
  return  this.afAuth.currentUser.then(
      (user: any) => {
        user.updatePassword(newPassword)
          .then(() =>{
            this.toastNotificationSv.showToast('Password changed!', ToastServiceType.success, ToastServicePosition.topCenter);
          })
          .catch((error: any) => {
            console.error(error);
            this.toastNotificationSv.showToast(error, ToastServiceType.danger, ToastServicePosition.topCenter);
          })
      }
    );
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.clear();
      this.userData = undefined;
      this.httpFirestoreSv.clearData();
      this.httpAdminFirestoreSv.clearData();
      this.router.navigate(['login']);
    })
  }

}
