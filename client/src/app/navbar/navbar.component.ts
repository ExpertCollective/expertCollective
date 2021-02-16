import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isResponsiveOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onMenuBarsClick() {
    this.isResponsiveOpen = !this.isResponsiveOpen;
    console.log('isResponsiveOpen = ' + this.isResponsiveOpen);
  }

}
