import * as url from "url";
import * as config from "../config/config-int.json";
import { PrepEmail } from "./prep-email";
import { SendEmail } from "./send-email";

export class ContactInfo {
  private expertCollectiveURL: string;
  temp: string = "Contact Info Temp";
  constructor(private prepEmail: PrepEmail, private sendEmail: SendEmail) {
    const hostname = config.expertCollective.hostname;
    const link = {
      protocol: "http",
      slashes: true,
      hostname: hostname,
    };
    this.expertCollectiveURL = url.format(link);
  }

  sendContactInfo(req, res) {
    console.log("[Messages] emailContactInfo()");
    console.log("[Messages][emailContactInfo] body ", req.body);
    const userEmail = req.body.userEmail;
    const userPhone = req.body.userPhone;
    const userName = req.body.userName;
    const message = req.body.message;
    const subject = req.body.subject;

    console.log("[Messages][emailContactInfo] userEmail: " + userEmail);
    console.log("[Messages][emailContactInfo] userPhone: " + userPhone);
    console.log("[Messages][emailContactInfo] userName: " + userName);
    console.log("[Messages][emailContactInfo] message: " + message);
    console.log("[Messages][emailContactInfo] subject: " + subject);

    // fix messaging for user
    if (!userEmail || !userName || !message || !subject) {
      console.log(
        "[ERROR][Messages][emailSendContact] Some parameter is NULL."
      );

      res.send({ success: false }); //Bad practice
      return;
    }
    let emailPrep = {
      to: "support@expertcollective.org",
      // from: userEmail,
      subject: "[ExpertCollectveCoop][Contact] - " + subject,
      //html: "userContact",
      context: {
        message:
          message + " | " + userName + " | " + userEmail + " | " + userPhone,
        link: this.expertCollectiveURL,
      },
    };
    const email = this.prepEmail.addTemplateToEmail("userContact", emailPrep);
    
  }
}
