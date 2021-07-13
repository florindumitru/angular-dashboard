import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EditUserDomains, UserDomains } from 'src/app/shared/models/user-domains';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpFirestoreService } from '../services/http/http-firestore.service';
import { ToastNotificationService, ToastServicePosition, ToastServiceType } from '../services/toast/toast-notification.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements AfterViewInit {

  subdomainFormControl = new FormControl('', [
    Validators.required,
  ]);

  ipfsLinkFormControl = new FormControl('', [
    Validators.required
  ]);

  ELEMENT_DATA_FROM_BACK: UserDomains[] = [];

  ELEMENT_DATA: EditUserDomains[] = [];

  // displayedColumns: string[] = ['subdomain', 'ipfsLink', 'datetime', 'action'];
  displayedColumns: string[] = ['userUid','userEmail', 'subdomain', 'ipfsLink', 'action'];

  dataSource: MatTableDataSource<EditUserDomains> = new MatTableDataSource<EditUserDomains>();
  selected = 'option1';

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  editForm = (e: any) => new FormGroup({
    subdomainName: new FormControl(e.subdomainName, Validators.required),
    ipfsLink: new FormControl(e.ipfsLink, Validators.required),
  });

  public isLoadingDomains: boolean = false;
  public isLoadingAddDomains: boolean = false;


  constructor(
    private httpFirestoreSv: HttpFirestoreService,
    private toastNotificationSv: ToastNotificationService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngAfterViewInit() {
    this.getUserDomainsIfLoggedUser();
  }

  applyFilter(event: any) {
    let filterValue = event.target.value
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRow(index: number) {
    const data = this.dataSource.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);

    this.dataSource.data = data;
  }

  confirmEditCreate(editUserRow: EditUserDomains) {
    if (!editUserRow.validator.valid) {
      this.toastNotificationSv.showErrorToast('Invalid data', ToastServicePosition.topCenter);
      return;
    } else if (editUserRow.currentData) {
      editUserRow.currentData.subdomainName = editUserRow.validator.value.subdomainName;
      editUserRow.currentData.ipfsLink = editUserRow.validator.value.ipfsLink;
      this.updateUserDomain(editUserRow.currentData);
      // this.toastNotificationSv.showToast('Update with success', ToastServiceType.success, ToastServicePosition.topCenter);
    }
  }

  updateUserDomain(userDomain: UserDomains) {
    let pureDomainObj = Object.assign({}, userDomain);
    this.httpFirestoreSv.updateUserDomainsByAdmin(pureDomainObj)
    .then(result => {
      this.toastNotificationSv.showToast('Update with success', ToastServiceType.success, ToastServicePosition.topCenter);
    })
    .catch(error => {
      console.log(error);
    });
  }


  startEdit() {

  }

  deleteUserDomain(userDomain: EditUserDomains) {
    let pureDomainObj = Object.assign({}, userDomain.originalData);
    this.httpFirestoreSv.deleteUserDomainByAdmin(pureDomainObj)
    .then(result => {
      this.toastNotificationSv.showToast('Deleted with success', ToastServiceType.success, ToastServicePosition.topCenter);
    })
    .catch(error => {
      console.log(error);
    });
  }

  clearAddUserDomainInputs() {
    this.subdomainFormControl.reset();
    this.ipfsLinkFormControl.reset();
  }

  addUserDomain() {
    this.isLoadingAddDomains = true;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    let subdomain = this.subdomainFormControl.value;
    let ipfsLink = this.ipfsLinkFormControl.value;
    if (user && user.uid) {
      let userDomain = new UserDomains('', user.uid, subdomain, ipfsLink, Date.now().toString());
      let pureDomainObj = Object.assign({}, userDomain);
      this.httpFirestoreSv.addUserDomains(pureDomainObj)
        .then((res) => {
          this.clearAddUserDomainInputs();
          this.toastNotificationSv.showToast('Domain added with success', ToastServiceType.success, ToastServicePosition.topCenter);
        })
        .catch((err: any) => {
          this.toastNotificationSv.showToast('Error adding domain', ToastServiceType.danger, ToastServicePosition.topCenter);
        }).finally(() => {
          this.isLoadingAddDomains = false;
        });

    } else {
      this.toastNotificationSv.showToast('Not allowed to add domain', ToastServiceType.danger, ToastServicePosition.topCenter);
    }
  }



  getUserDomainsIfLoggedUser() {
    this.afAuth.onAuthStateChanged((user) => {
      if (!user) {
        // console.error('not logged');
        this.toastNotificationSv.showToast('Not logged in!', ToastServiceType.danger, ToastServicePosition.topCenter);
        // return;
      } else {
        // this.getUserDomains();
        this.getAllUsersWithDomains();
      }
    });
  }


  // getUserDomains() {
  //   this.isLoadingDomains = true;
  //   this.httpFirestoreSv.getUserDomains().subscribe((res: any) => {
  //     this.ELEMENT_DATA = [];
  //     res.forEach((element: any) => {
  //       this.ELEMENT_DATA.push({
  //         currentData: element,
  //         originalData: element,
  //         editable: false,
  //         validator: this.editForm(element)
  //       });
  //     });

  //     this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     this.isLoadingDomains = false;
  //   }, error => {
  //     console.error(error);
  //     // this.toastNotificationSv.showToast(error.message? error.message : "Error getting data", ToastServiceType.danger, ToastServicePosition.topCenter);
  //     this.isLoadingDomains = false;
  //   });
  // }


  getAllUsersWithDomains() {
    this.httpFirestoreSv.getAllUsersAndDomains().subscribe(usersDomainsObservables => {
      this.ELEMENT_DATA = [];

      combineLatest(usersDomainsObservables as [])
        .pipe(
          take(1))
        .subscribe(allUsersDomains => {

          allUsersDomains.forEach((userDomains: any) => {
            userDomains.forEach((userDomain: UserDomains) => {
              this.ELEMENT_DATA.push({
                currentData: userDomain,
                originalData: userDomain,
                editable: false,
                validator: this.editForm(userDomain)
              });
            });
          });

          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoadingDomains = false;

        }, error => {
          console.log('CombineLatest error ', error);
        })

    }, error => {
      console.error("Get users domains Observables error: ", error);
    });
  }

  ngOnDestroy() {
    this.dataSource.data = [];
    this.ELEMENT_DATA = [];
    this.ELEMENT_DATA_FROM_BACK = [];
  }

}
