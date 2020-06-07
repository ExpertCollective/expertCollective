import * as url from "url";
import * as config from "../config/config-int.json";
import { PrepEmail, EmailOptions, EmailContext } from "./prep-email";
import { SendEmail } from "./send-email";
import { LogToFile } from "../logging/logToFile";

export type ContactUsProperties = {
  userEmail: string;
  userPhone: string;
  userName: string;
  message: string;
  subject: string;
};

export class ContactInfo {
  private expertCollectiveURL: string;
  private contactInfoDir: string = "contact-info";
  constructor(
    private prepEmail: PrepEmail,
    private sendEmail: SendEmail,
    private logToFile: LogToFile
  ) {
    const hostname = config.expertCollective.hostname;
    const link = {
      protocol: "http",
      slashes: true,
      hostname: hostname,
    };
    this.expertCollectiveURL = url.format(link);
  }

  sendContactInfo(req, res) {
    this.logToFile.writeFileToDirectory(this.contactInfoDir, req.body);
    const contactUs = this.verifyContactUsProperties(req.body);
    if (!contactUs) {
      res.status(400);
      return res.send({ message: "Some parameter is NULL" });
    }
    const emailContext: EmailContext = {
      message:
        contactUs.message +
        " | " +
        contactUs.userName +
        " | " +
        contactUs.userEmail +
        " | " +
        contactUs.userPhone,
      link: this.expertCollectiveURL,
    };
    const emailPrep: EmailOptions = {
      to: config.email.accountSupport,
      subject: "[ExpertCollectiveCoop][Contact] - " + contactUs.subject,
      context: emailContext,
      text: emailContext.message,
      html: this.prepEmail.addTemplateToEmail("userContact", emailContext),
    };
    try {
      this.sendEmail.sendEmail(emailPrep).then(
        (data) => {
          return res.json({ success: true });
        },
        (error) => {
          console.error("[Error] nodemailer: ", error);
          res.status(error.status || 500);
          return res.json({ error: error });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(err.staus || 500);
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
