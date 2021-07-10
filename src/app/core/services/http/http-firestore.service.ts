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
export class HttpFirestoreService implements OnInit {
  private userDomainsCollection!: AngularFirestoreCollection<UserDomains>;

  private userDomains!: Observable<UserDomains>;

  userDomainsDoc!: AngularFirestoreDocument<UserDomains>;

  private user: any;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.createUserDomainsCollection();
  }

  createUserDomainsCollection() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = user;
    console.log(user);
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
    return this.userDomainsCollection
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

  getAllUsersAndDomains() {
    this.userDomainsCollection = this.afs.collection(`users`);
    return this.userDomainsCollection
    .snapshotChanges()
    .pipe(
      map((changes: any) => {
        return changes.map((a: any) => {
          const data = a.payload.doc.data() as User;
          data.id = a.payload.doc.id;
          this.userDomainsCollection = this.afs.collection(
            `users/${data.id}/userDomains`);
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
        });
      })
    );
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
