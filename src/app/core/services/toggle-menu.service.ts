import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleMenuService {

  private toggleMenuSubject = new BehaviorSubject(true);
  private toggleMenu = this.toggleMenuSubject.asObservable();

  constructor() { }

  toggleTheMenu() {
    this.toggleMenuSubject.next(!this.toggleMenu);
  }

  getToggleMenu() {
    return this.toggleMenu;
  }

}
