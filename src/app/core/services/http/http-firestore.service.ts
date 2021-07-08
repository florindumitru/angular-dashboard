import { Injectable, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserDomains } from 'src/app/shared/models/user-domains';
import { map } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpFirestoreService  implements OnInit {
  private userDomainsCollection!: AngularFirestoreCollection<UserDomains>;

  private userDomains!: Observable<UserDomains>;

  userDomainsDoc!: AngularFirestoreDocument<UserDomains>;

  private user: any;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    // await afAuth.signInWithCredential(afAuth.currentUser);
    // this.userDomains = this.afs.collection('userDomains').valueChanges();
    // (this.afAuth.authState.subscribe(res => {
    //   // console.log(res);
    // }));
    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    // let user = authService.userData;
    // console.log(user);
    // this.userDomainsCollection = this.getUserDomainsByUid('19yluNizPyZQPybxnIBSGGWN6jH3');
    // this.userDomainsCollection = this.afs.doc(`${user.uid}`).collection(`userDomains`, x => x.where("uid", "==", user.uid));
    // let user = await this.afAuth.currentUser;
    // if (this.user && this.user.uid) {
    //   this.userDomainsCollection = this.afs.collection(`userDomains`, x => x.where("uid", "==", this.user.uid));
    //   // this.userDomainsCollection =  this.afs.collection(`userDomains`, ref => ref.orderBy('datetime','asc'));
    //   this.userDomains = this.userDomainsCollection.snapshotChanges().pipe(map((changes: any) => {
    //     return changes.map((a: any) => {
    //       const data = a.payload.doc.data() as UserDomains;
    //       data.id = a.payload.doc.id;
    //       return data;
    //     });
    //   }));
    // }
    // this.createUserDomainsCollection();
  }

  ngOnInit() {
    console.log('Init service');
    this.createUserDomainsCollection();
  }

  createUserDomainsCollection () {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = user;
    if (user && user.uid) {
      this.userDomainsCollection = this.afs.collection(
        `users/${user.uid}/userDomains`,
        (x) => x.where('uid', '==', user.uid)
      );
    } else {
      // return to login
      this.router.navigate(['login']);
    }
  }

  getUserDomains() {
    console.log(this.userDomainsCollection);
    if (!this.userDomainsCollection) {
      this.createUserDomainsCollection();
    }
    return this.userDomainsCollection
    .snapshotChanges()
    .pipe(
      map((changes: any) => {
        return changes.map((a: any) => {
          const data = a.payload.doc.data() as UserDomains;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  addUserDomains(userDomain: UserDomains) {
    // this.userDomainsCollection
    //   .add(userDomain)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err: any) => {
    //     console.log(err);
    //   });
   return  this.userDomainsCollection
    .add(userDomain);
  }

  deleteUserDomains(userDomain: UserDomains) {
    this.userDomainsDoc = this.afs.doc(
      `users/${this.user.uid}/userDomains/${userDomain.id}`
    );
    this.userDomainsDoc.delete();
  }

  updateUserDomains(userDomain: UserDomains) {
    this.userDomainsDoc = this.afs.doc(
      `users/${this.user.uid}/userDomains/${userDomain.id}`
    );
    this.userDomainsDoc.update(userDomain);
  }

  getUserDomainsByUid(uid: string) {
    // this.userDomainsDoc = this.afs.doc(`${uid}`);
    // return this.userDomainsDoc.get();
  }

  clearData() {
    this.userDomains = new Observable<UserDomains>();
    // this.userDomainsCollection = undefined;
    // this.userDomainsCollection = new  AngularFirestoreCollection();
  }

  //// sec poli
  // service cloud.firestore {
  //   match /databases/{database}/documents {
  //     match /Notebooks/{notebook_id} {
  //       allow read, write: if request.auth != null && request.auth.uid == resource.data.owner;
  //     }
  //   }
  // }
}
