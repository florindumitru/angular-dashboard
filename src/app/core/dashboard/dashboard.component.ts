import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface EditUserDto {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  project: string;
  team: string;
}

export interface EditUser {
  currentData?: EditUserDto;
  originalData: EditUserDto;
  editable: boolean;
  validator: FormGroup;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ELEMENT_DATA_FROM_BACK: EditUserDto[] = [
    {id: 1, firstName: 'Ion', lastName: 'Popescu', username: 'ipopescu', email: 'ion.popescu@domain.com', project: 'bench', team: ''},
    {id: 2, firstName: 'Ion', lastName: 'Vasile', username: 'ivasile', email: 'ion.vasile@domain.com', project: 'bench', team: ''},
    {id: 3, firstName: 'Gigel', lastName: 'Popescu', username: 'gpopescu', email: 'gigel.popescu@domain.com', project: 'bench', team: ''},
    {id: 4, firstName: 'Dorel', lastName: 'Popescu', username: 'dpopescu', email: 'dorel.popescu@domain.com', project: 'bench', team: ''},
    {id: 5, firstName: 'Cardel', lastName: 'Popescu', username: 'cpopescu', email: 'cardel.popescu@domain.com', project: 'bench', team: ''},
    {id: 6, firstName: 'Alex', lastName: 'Popescu', username: 'apopescu', email: 'alex.popescu@domain.com', project: 'bench', team: ''},
    {id: 7, firstName: 'Mihai', lastName: 'Popescu', username: 'mpopescu', email: 'mihai.popescu@domain.com', project: 'bench', team: ''}
  ];

  ELEMENT_DATA: EditUser[] = [];

  // displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'email', 'project', 'team', 'action'];
  displayedColumns: string[] = ['subdomain', 'ipfsLink', 'action'];

  dataSource: MatTableDataSource<EditUser> = new MatTableDataSource<EditUser>();
  selected = 'option1';

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  editForm!: FormGroup;

  constructor() {
    const editForm = (e:any) => new FormGroup({
      firstName: new FormControl(e.firstName,Validators.required),
      lastName: new FormControl(e.lastName,Validators.required),
      username: new FormControl(e.username,Validators.required),
      email: new FormControl(e.email,Validators.required),
    });
    this.ELEMENT_DATA_FROM_BACK.forEach(element => {
      this.ELEMENT_DATA.push({currentData: element, 
                              originalData: element, 
                              editable: false, 
                              validator: editForm(element)});
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA.slice());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  confirmEditCreate() {
  }

  startEdit() {

  }

  cancelOrDelete() {
  }

}
