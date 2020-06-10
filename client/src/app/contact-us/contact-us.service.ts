import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, of, Subject, BehaviorSubject } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { ContactInfoDto } from "../dto/contactInfoDto";

@Injectable({
  providedIn: "root",
})
export class ContactUsService {
  constructor(private httpClient: HttpClient) {}

  contactInfoSent$ = new BehaviorSubject<boolean>(false);

  sendContactInfo(contactData: any) {
    const contactInfo: ContactInfoDto = {
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      jobTitle: contactData.jobTitle,
      organization: contactData.organization,
      address: contactData.address,
      phoneNumber: contactData.phoneNumber,
      emailAddress: contactData.emailAddress,
      commentMessage: contactData.tryingToAchieve,
    };

    this.httpClient
      .post<boolean>("api/sendcontact/", contactInfo)
      .pipe(
        map((data) => {
          console.log(
            `[ContactUsService] sendContactInfo data: ${JSON.stringify(
              data,
              null,
              2
            )}`
          );
          return data["success"];
        }),
        catchError((err: HttpErrorResponse) => {
          console.log(`Logging Interceptor: ${err.error.message}`);
          return of(new HttpResponse({ body: { message: err.error.message } }));
        })
      )
      .subscribe((result) =>
        this.contactInfoSent$.next(typeof result === "boolean" ? result : false)
      );
  }

  clearContactInfoSent() {
    this.contactInfoSent$.next(false);
  }
}
