import { ContactInfo } from "./contact-info";
export class InteractionRoutes {
  constructor(private contactInfo: ContactInfo) {}

  sendContact = (req, res) => {
    console.log("[InteractionRoutes]sendContact body: ", req.body);

    return this.contactInfo.sendContactInfo(req, res);
  };
}
