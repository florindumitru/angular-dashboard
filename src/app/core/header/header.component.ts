import { Component, OnInit } from '@angular/core';
import { ToggleMenuService } from '../services/toggle-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private toggleMenuService: ToggleMenuService
  ) { }

  ngOnInit(): void {
    this.toggleSidenav()
  }
  toggleSidenav() {
    this.toggleMenuService.toggleTheMenu();
  }
}
