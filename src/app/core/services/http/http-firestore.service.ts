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
    this.userDomainsCollection =  this.afs.collection('userDomains', ref => ref.orderBy('datetime','asc'));

    this.userDomains = this.userDomainsCollection.snapshotChanges().pipe(map((changes:any) => {
      return changes.map((a:any) => {
        const data = a.payload.doc.data() as UserDomains;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

  }

  getUserDomains() {
    return this.userDomains;
  }

  addUserDomains(userDomain: UserDomains){
    this.userDomainsCollection.add(userDomain);
  }

  deleteUserDomains(userDomain: UserDomains){
    this.userDomainsDoc = this.afs.doc(`userDomains/${userDomain.id}`);
    this.userDomainsDoc.delete();
  }

  updateUserDomains(userDomain: UserDomains){
    this.userDomainsDoc = this.afs.doc(`userDomains/${userDomain.id}`);
    this.userDomainsDoc.update(userDomain);
  }

}
