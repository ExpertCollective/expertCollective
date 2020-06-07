import * as nodemailer from "nodemailer";
import Mail = require("nodemailer/lib/mailer");
import { SentMessageInfo } from "nodemailer";

export class SendEmail {
  transporter: Mail;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "support@expertcollective.org",
        pass: "password1",
      },
    });
  }

  sendEmail(email: Mail.Options): Promise<SentMessageInfo> {
    console.log("[SendEmail][sendEmail] email: ");
    return Promise.resolve(true);
    // new Promise((_) => {
    //   console.log('need to implement email notification')
    //   return true;
    // }).then((data) => data);

    // TODO: Implement email
    // try {
    //   return this.transporter.sendMail({
    //     from: email ? email.from : "missingfrom@example.com",
    //     to: email ? email.to : "missingTo@example.com",
    //     subject: email ? email.subject : "Missing Subjet",
    //     text: email ? email.text : "Missing Text",
    //     html: email ? email.html : "Missing HTML",
    //   });
    // } catch (err) {
    //   console.error(err);
    //   throw err;
    // }
  }
}
