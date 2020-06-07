import * as url from "url";
import * as config from "../config/config-int.json";
import { PrepEmail, EmailOptions, EmailContext } from "./prep-email";
import { SendEmail } from "./send-email";
import { LogToFile } from "../logging/logToFile";
import { ContactInfoDto } from "../dto/contactInfoDto";

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
        contactUs.commentMessage +
        " | " +
        `${contactUs.firstName} ${contactUs.lastName}` +
        " | " +
        `${contactUs.jobTitle} of ${contactUs.organization}` +
        " | " +
        contactUs.emailAddress +
        " | " +
        contactUs.phoneNumber +
        " | " +
        contactUs.address,
      link: this.expertCollectiveURL,
    };
    const emailPrep: EmailOptions = {
      to: config.email.accountSupport,
      subject: `[ExpertCollectiveCoop][Contact] - ${contactUs.organization} ${contactUs.jobTitle} ${contactUs.firstName} ${contactUs.lastName}`,
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

  verifyContactUsProperties(input: any): ContactInfoDto {
    const contactUs: ContactInfoDto = {
      firstName: input.firstName,
      lastName: input.lastName,
      jobTitle: input.jobTitle,
      organization: input.organization,
      address: input.address,
      phoneNumber: input.phoneNumber,
      emailAddress: input.emailAddress,
      commentMessage: input.commentMessage,
    };

    console.log(
      `[Messages][emailContactInfo] firstName: ${contactUs.firstName} lastName: ${contactUs.lastName}`
    );
    console.log(
      `[Messages][emailContactInfo] jobTitle: ${contactUs.jobTitle} of organiztion: ${contactUs.organization}`
    );
    console.log(`[Messages][emailContactInfo] address: ${contactUs.address}`);
    console.log(
      `[Messages][emailContactInfo] phoneNumber: ${contactUs.phoneNumber}`
    );
    console.log(
      `[Messages][emailContactInfo] emailAddress: ${contactUs.emailAddress}`
    );
    console.log(
      `[Messages][emailContactInfo] commentMessage: ${contactUs.commentMessage}`
    );

    // fix messaging for user
    if (!contactUs.emailAddress) {
      console.log(
        "[ERROR][Messages][emailSendContact] Email Address parameter is NULL."
      );

      return null;
    }
    return contactUs;
  }
}
