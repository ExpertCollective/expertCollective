import * as url from "url";
import * as config from "../config/config-int.json";
import { PrepEmail, EmailOptions } from "./prep-email";
import { SendEmail } from "./send-email";

export type ContactUsProperties = {
  userEmail: string;
  userPhone: string;
  userName: string;
  message: string;
  subject: string;
};

export class ContactInfo {
  private expertCollectiveURL: string;
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
    const contactUs = this.verifyContactUsProperties(req.body);
    if (!contactUs) {
      return res.send({ success: false }); //Bad practice
    }
    let emailPrep: EmailOptions = {
      to: "support@expertcollective.org",
      subject: "[ExpertCollectiveCoop][Contact] - " + contactUs.subject,
      context: {
        message:
          contactUs.message +
          " | " +
          contactUs.userName +
          " | " +
          contactUs.userEmail +
          " | " +
          contactUs.userPhone,
        link: this.expertCollectiveURL,
      },
    };
    const email = this.prepEmail.addTemplateToEmail("userContact", emailPrep);
    try {
      this.sendEmail.sendEmail(email).then((data) => {
        return res.json({ success: true });
      });
    } catch (err) {
      console.error(err);
      res.json({ error: err.message || err });
    }
  }

  verifyContactUsProperties(input: any): ContactUsProperties {
    const contactUs: ContactUsProperties = {
      userEmail: input.userEmail,
      userPhone: input.userPhone,
      userName: input.userName,
      message: input.message,
      subject: input.subject,
    };

    console.log(
      "[Messages][emailContactInfo] userEmail: " + contactUs.userEmail
    );
    console.log(
      "[Messages][emailContactInfo] userPhone: " + contactUs.userPhone
    );
    console.log("[Messages][emailContactInfo] userName: " + contactUs.userName);
    console.log("[Messages][emailContactInfo] message: " + contactUs.message);
    console.log("[Messages][emailContactInfo] subject: " + contactUs.subject);

    // fix messaging for user
    if (
      !contactUs.userEmail ||
      !contactUs.userName ||
      !contactUs.message ||
      !contactUs.subject
    ) {
      console.log(
        "[ERROR][Messages][emailSendContact] Some parameter is NULL."
      );

      return null;
    }
    return contactUs;
  }
}
