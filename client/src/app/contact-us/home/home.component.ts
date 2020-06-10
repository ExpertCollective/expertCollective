import { Component, OnInit } from "@angular/core";
import { ContactUsService } from "../contact-us.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private contactUsService: ContactUsService) {
  }

  contactInfoSent$: Observable<boolean> = this.contactUsService
    .contactInfoSent$;

  ngOnInit() {
  }
}
