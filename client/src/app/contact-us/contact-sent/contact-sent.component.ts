import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactUsService } from '../contact-us.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-sent',
  templateUrl: './contact-sent.component.html',
  styleUrls: ['./contact-sent.component.scss']
})
export class ContactSentComponent implements OnInit {

  constructor(private contactUsService: ContactUsService,
    private router: Router) { }

  ngOnInit() {
  }

  onClick() {
    this.router.navigate(["/"]);
    this.contactUsService.clearContactInfoSent();
  }
}
