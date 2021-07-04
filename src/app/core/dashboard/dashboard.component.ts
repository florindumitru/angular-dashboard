import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EditUserDomains, UserDomains } from 'src/app/shared/models/user-domains';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpFirestoreService } from '../services/http/http-firestore.service';
import { ToastNotificationService, ToastServicePosition, ToastServiceType } from '../services/toast/toast-notification.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  subdomainFormControl = new FormControl('', [
    Validators.required,
  ]);

  ipfsLinkFormControl = new FormControl('', [
    Validators.required
  ]);


  ELEMENT_DATA_FROM_BACK: UserDomains[] = [];

  ELEMENT_DATA: EditUserDomains[] = [];

  // displayedColumns: string[] = ['subdomain', 'ipfsLink', 'datetime', 'action'];
  displayedColumns: string[] = ['subdomain', 'ipfsLink', 'action'];

  dataSource: MatTableDataSource<EditUserDomains> = new MatTableDataSource<EditUserDomains>();
  selected = 'option1';

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  editForm = (e: any) => new FormGroup({
    subdomainName: new FormControl(e.subdomainName, Validators.required),
    ipfsLink: new FormControl(e.ipfsLink, Validators.required),
  });


  constructor(
    private httpFirestoreSv: HttpFirestoreService,
    private toastNotificationSv: ToastNotificationService,
    private afAuth: AngularFireAuth
  ) {

    // this.getUserDomains();
  }

   ngOnInit() {
    console.log("init dashboards");
    this.getUserDomains();
    // this.getUserDomainsById();

    // let user = await this.afAuth.currentUser;
    // let uid = user?.uid;
    // console.log(user)
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
      this.toastNotificationSv.showToast('Update with success', ToastServiceType.success, ToastServicePosition.topCenter);
    }
  }

  updateUserDomain(userDomain: UserDomains) {
    let pureDomainObj = Object.assign({}, userDomain);
    this.httpFirestoreSv.updateUserDomains(pureDomainObj);
  }


  startEdit() {

  }

  cancelOrDelete() {
  }


  addUserDomain() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    let subdomain = this.subdomainFormControl.value;
    let ipfsLink = this.ipfsLinkFormControl.value;
    console.log(subdomain, ipfsLink);
    let userDomain = new UserDomains('', user.uid ,subdomain, ipfsLink, Date.now().toString());
    let pureDomainObj = Object.assign({}, userDomain);
    this.httpFirestoreSv.addUserDomains(pureDomainObj);
  }




  getUserDomains() {
    this.httpFirestoreSv.getUserDomains().subscribe((res: any) => {
      this.ELEMENT_DATA = [];
      res.forEach((element: any) => {
        this.ELEMENT_DATA.push({
          currentData: element,
          originalData: element,
          editable: false,
          validator: this.editForm(element)
        });
      });

      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error(error);
    });
  }

  getUserDomainsById() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.httpFirestoreSv.getUserDomainsByUid(user.uid).subscribe((res: any) => {
      this.ELEMENT_DATA = [];
      res.forEach((element: any) => {
        this.ELEMENT_DATA.push({
          currentData: element,
          originalData: element,
          editable: false,
          validator: this.editForm(element)
        });
      });

      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error(error);
    });
  }


  ngOnDestroy(){
    console.log("destroy");
    this.dataSource.data = [];
    this.ELEMENT_DATA = [];
    this.ELEMENT_DATA_FROM_BACK = [];
  }
}
