import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ContactUsService } from "../contact-us.service";

@Component({
  selector: "app-contact-form",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.scss"],
})
export class ContactFormComponent implements OnInit {
  contactUsForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private contactUsService: ContactUsService
  ) {
    this.contactUsForm = this.formBuilder.group({
      firstName: "",
      lastName: "",
      jobTitle: "",
      organization: "",
      address: "",
      phoneNumber: "",
      emailAddress: "",
      tryingToAchieve: "",
    });
  }

  ngOnInit() {}
  onSubmit(contactData: any) {
    // TODO: save data to file via service

    console.log(
      `[ContactFormComponent] onSubmit contactData: ${JSON.stringify(
        contactData,
        null,
        2
      )}`
    );
    this.contactUsService
      .sendContactInfo(contactData)
      .subscribe(
        (result) =>
          (this.errorMessage =
            typeof result === "boolean" ? undefined : result.body.message)
      );
    this.contactUsForm.reset();
  }
}
