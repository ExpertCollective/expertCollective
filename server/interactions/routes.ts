import { ContactInfo } from "./contact-info";
export class InteractionRoutes {
  constructor(private contactInfo: ContactInfo) {
    console.log("InteractionRoutes: " + contactInfo.temp);
    console.log("InteractionRoutes: this. " + this.contactInfo.temp);
  }
  sendcontact = (req, res) => {
    console.log("sendcontact: ", req.body);
    console.log(this.contactInfo.temp);

    return this.contactInfo.sendContactInfo(req, res);
  };
}
