import { ContactInfo } from "./contact-info";
export class InteractionRoutes {
  constructor(private contactInfo: ContactInfo) {
    console.log("[InteractionRoutes]constructor " + contactInfo.temp);
    console.log(
      "[InteractionRoutes]constructor this. " + this.contactInfo.temp
    );
  }
  sendContact = (req, res) => {
    console.log("[InteractionRoutes]sendContact body: ", req.body);
    console.log(this.contactInfo.temp);

    return this.contactInfo.sendContactInfo(req, res);
  };
}
