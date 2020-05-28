import * as fs from "fs";
import * as handlebars from "handlebars";
import * as companySettings from "../settings/company-info.json";

export class PrepEmail {
  emailTemplates;
  emailsList = ["userContact"];

  constructor() {
    this.emailTemplates = {};
    this.emailsList.forEach((emailTmp) => this.loadTemplates(emailTmp));
  }

  loadTemplates(filename) {
    fs.readFile(
      "./assets/templates/" + filename + ".hbs",
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

  addTemplateToEmail(filename: string, email) {
    if (email) {
      console.log(
        "[PrepEmail] addTemplateToEmail from " +
          email.from +
          " to " +
          email.to +
          " with subject: " +
          email.subject,
        " filename: ",
        filename
      );
      const template = this.getTemplate(filename, email.context);
      if (template) {
        const data = new Uint8Array(Buffer.from(template));
        fs.writeFile("message.txt", data, (err) => {
          if (err) throw err;
          console.log("The file has been saved!");
        });

        email.html = template;
        return email;
      } else {
        console.log(
          "[ERROR][PrepEmail] something wrong with the email (" +
            email.html +
            ") from: " +
            email.from +
            "- to: " +
            email.to
        );
        throw "email template not available";
      }
    }
  }

  getTemplate(filename: string, context) {
    const source = this.emailTemplates[filename];
    if (source) {
      const template = handlebars.compile(source);
      console.log("[PrepEmail]getTemplate template: ", template)
      return template(Object.assign({}, companySettings, context));
    }
    return null;
  }
}
