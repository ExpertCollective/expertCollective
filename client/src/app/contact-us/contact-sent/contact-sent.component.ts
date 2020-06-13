import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactUsService } from '../contact-us.service';

@Component({
  selector: 'app-contact-sent',
  templateUrl: './contact-sent.component.html',
  styleUrls: ['./contact-sent.component.scss']
})
export class ContactSentComponent implements OnInit {

  constructor(private contactUsService: ContactUsService) { }

  ngOnInit() {
  }

  onClickBack() {
    this.contactUsService.clearContactInfoSent();
  }
}
