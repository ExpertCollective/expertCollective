import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menunav',
  templateUrl: './menunav.component.html',
  styleUrls: ['./menunav.component.scss']
})
export class MenunavComponent implements OnInit {
  @Input() isResponsiveOpen: boolean;

  navLinks: string[] = [
    "advisory", "praxis", "ventures", "contact-us", "about-us"
  ]

  constructor() { }

  ngOnInit() {
  }

}
