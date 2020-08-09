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
import { successMessageDto } from '../dto/successMessageDto';

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
      commentMessage: contactData.commentMessage,
    };

    return this.httpClient
      .post<successMessageDto>("api/sendcontact/", contactInfo)
      .pipe(
        map((data: successMessageDto) => {
          console.log(
            `[ContactUsService] sendContactInfo data: ${JSON.stringify(
              data,
              null,
              2
            )}`
          );
          this.contactInfoSent$.next(data.success)
          return data.success;
        }),
        catchError((err: HttpErrorResponse) => {
          console.log(`Error: ${err.error}`);
          console.log(`Message: ${err.message}`);
          console.log(`Status: ${err.status} StatusText: ${err.statusText}`);
          return of(err);
        })
      );
  }

  clearContactInfoSent() {
    this.contactInfoSent$.next(false);
  }
}
