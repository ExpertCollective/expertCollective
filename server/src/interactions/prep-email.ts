import * as fs from "fs";
import * as handlebars from "handlebars";
import * as companySettings from "../settings/company-info.json";
import * as deploymentSettings from "../settings/deployment.json"
import Mail = require("nodemailer/lib/mailer");
import { Address } from "nodemailer/lib/mailer";

export type EmailContext = {
  message: string;
  link: string;
};

export type EmailOptions = {
  /** Comma separated list or an array of recipients e-mail addresses that will appear on the To: field */
  to?: string | Address | Array<string | Address>;
  /** The subject of the e-mail */
  subject?: string;
  /** The plaintext version of the message */
  text?: string | Buffer;
  /** The HTML version of the message */
  html?: string | Buffer;
  context?: EmailContext;
};

export class PrepEmail {
  emailTemplates;
  emailsList = ["userContact"];

  constructor() {
    this.emailTemplates = {};
    this.emailsList.forEach((emailTmp) => this.loadTemplates(emailTmp));
  }

  loadTemplates(filename) {
    fs.readFile(
      `./${deploymentSettings.distFolder}/assets/templates/${filename}.hbs`,
      (err: NodeJS.ErrnoException, data: Buffer) => {
        if (err) {
          console.log(
            "[ERROR][PrepEmail] error load an email template >> " + filename
          );
          console.log("[ERROR][PrepEmail] error: ", err);
        } else {
          var sourceTmp = data.toString();
          this.emailTemplates[filename] = sourceTmp;
          console.log("[PrepEmail] load template >> " + filename);
        }
      }
    );
  }

  addTemplateToEmail(filename: string, emailContext: EmailContext): string {
    if (!emailContext || !emailContext.message) {
      console.error(
        !emailContext
          ? `[ERROR][PrepEmail] addTemplateToEmail missing emailContext! filename: ${filename}`
          : "[ERROR][PrepEmail] addTemplateToEmail message: " +
              emailContext.message +
              " link: " +
              emailContext.link +
              " filename: " +
              filename
      );
      throw "missing email message";
    }
    const htmlVersionOfMessage = this.getTemplate(filename, emailContext);
    if (htmlVersionOfMessage) {
      const data = new Uint8Array(Buffer.from(htmlVersionOfMessage));
      fs.writeFile("message.txt", data, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });

      return htmlVersionOfMessage;
    }
    console.error(
      `[ERROR][PrepEmail] email template not available: Template filename: ${filename}`
    );
    throw "email template not available";
  }

  getTemplate(filename: string, context): string {
    const source = this.emailTemplates[filename];
    if (source) {
      const template = handlebars.compile(source);
      console.log("[PrepEmail]getTemplate template: ", template);
      return template(Object.assign({}, companySettings, context));
    }
    console.error(
      "[ERROR][PrepEmail]getTemplate Template not loaded or found!"
    );
    throw "Email template not loaded or found!";
  }
}
