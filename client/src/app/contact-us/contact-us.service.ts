import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ContactInfoDto } from '../dto/contactInfoDto';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private httpClient: HttpClient) { }

  contactInfoResponse$: Observable<any>

  sendContactInfo(contactData: any) {

    const contactInfo : ContactInfoDto = {
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      jobTitle: contactData.jobTitle,
      organization: contactData.organization,
      address: contactData.address,
      phoneNumber: contactData.phoneNumber,
      emailAddress: contactData.emailAddress,
      commentMessage: contactData.tryingToAchieve,
    }
    console.log(
      `[ContactUsService] sendContactInfo contactData: ${JSON.stringify(
        contactInfo,
        null,
        2
      )}`
    );
    this.contactInfoResponse$ = this.httpClient.post<any>("api/sendcontact/", contactInfo).pipe(
      map(data => {
       console.log(`[ContactUsService] sendContactInfo data: ${JSON.stringify(data, null, 2)}`)
       return  data
      }),
      // catchError(error => {
      //   return error.message === false || false;
      // })
    )
  }
}
