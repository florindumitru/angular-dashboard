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
  providedIn: 'root'
})
export class HttpAdminFirestoreService {

  private userDomainsCollection!: AngularFirestoreCollection<UserDomains>;

  private userDomains!: Observable<UserDomains>;

  userDomainsDoc!: AngularFirestoreDocument<UserDomains>;

  private user: any;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { this.createUserDomainsCollection();  }

  ngOnInit() {
   
  }

  createUserDomainsCollection() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = user;
    if (user && user.uid) {
      this.userDomainsCollection = this.afs.collection(`users`);
    } else {
      // return to login
      this.router.navigate(['login']);
    }
  }


  addUserDomains(userDomain: UserDomains) {
  return  this.afs.collection(
      `users/${this.user.uid}/userDomains`).add(userDomain);
    // return this.userDomainsCollection
    //   .add(userDomain);
  }


  deleteUserDomainByAdmin(userDomain: UserDomains) {
    return this.afs.doc(
      `users/${userDomain.uid}/userDomains/${userDomain.id}`
    ).delete();

      // this.afs.collection(`users/${userDomain.uid}/userDomains`,
      //     ref => ref.orderBy('id')).valueChanges().subscribe(userDomains => {
      //     userDomains.map((userDomain: any) => {
      //         this.afs.doc(`users/${userDomain.uid}/userDomains/${userDomain.id}`).delete()
      //             .catch(error => {console.log(error); })
      //             .then(() => console.log(`Deleting user domain (${userDomain.id}) in (${userDomain.uid})`));
      //     });
      // });
      // this.testDoc.delete().catch(error => console.log(error)).then(() => console.log(`${this.testID} has been deleted.`));
 


  }


  updateUserDomainsByAdmin(userDomain: UserDomains) {
    return this.afs.doc(
      `users/${userDomain.uid}/userDomains/${userDomain.id}`
    ).update(userDomain);
  }

  getAllUsersAndDomains() {
    if (!this.userDomainsCollection) {
      this.createUserDomainsCollection();
    }
   return this.userDomainsCollection
      .snapshotChanges()
      .pipe(
        map((changes: any) => {
          return changes.map((a: any) => {
            const userData = a.payload.doc.data() as User;
            userData.id = a.payload.doc.id;

            return this.afs.collection(
              `users/${userData.id}/userDomains`)
              .snapshotChanges()
              .pipe(
                map((changes: any) => {
                  
                  return changes.map((a: any) => {
                    const data = a.payload.doc.data() as UserDomains;
                    data.id = a.payload.doc.id;
                    data.userEmail = userData.email;
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
}
