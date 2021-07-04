import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserDomains } from 'src/app/shared/models/user-domains';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpFirestoreService {

  private userDomainsCollection: AngularFirestoreCollection<UserDomains>;

  private userDomains: Observable<UserDomains>;

  userDomainsDoc!: AngularFirestoreDocument<UserDomains>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {
    // await afAuth.signInWithCredential(afAuth.currentUser);
    // this.userDomains = this.afs.collection('userDomains').valueChanges();


    // (this.afAuth.authState.subscribe(res => {
    //   // console.log(res);
    // }));

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // console.log(user);

    // this.userDomainsCollection = this.getUserDomainsByUid('19yluNizPyZQPybxnIBSGGWN6jH3');


    // this.userDomainsCollection = this.afs.doc(`${user.uid}`).collection(`userDomains`, x => x.where("uid", "==", user.uid));

    this.userDomainsCollection = this.afs.collection(`userDomains`, x => x.where("uid", "==", user.uid));

  
    // this.userDomainsCollection =  this.afs.collection(`userDomains`, ref => ref.orderBy('datetime','asc'));

    this.userDomains = this.userDomainsCollection.snapshotChanges().pipe(map((changes: any) => {
      return changes.map((a: any) => {
        const data = a.payload.doc.data() as UserDomains;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

  }

  getUserDomains() {
    return this.userDomains;
  }

  addUserDomains(userDomain: UserDomains) {
    this.userDomainsCollection.add(userDomain);
  }

  deleteUserDomains(userDomain: UserDomains) {
    this.userDomainsDoc = this.afs.doc(`userDomains/${userDomain.id}`);
    this.userDomainsDoc.delete();
  }

  updateUserDomains(userDomain: UserDomains) {
    this.userDomainsDoc = this.afs.doc(`userDomains/${userDomain.id}`);
    this.userDomainsDoc.update(userDomain);
  }


  getUserDomainsByUid(uid: string) {
    this.userDomainsDoc = this.afs.doc(`${uid}`);
    return this.userDomainsDoc.get();
  }


  clearData() {
    this.userDomains = new Observable<UserDomains>();
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
