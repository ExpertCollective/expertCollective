import * as multipart from "connect-multiparty";

export class SetupEmailService {
  multipartMiddleware: any;
  constructor() {
    this.multipartMiddleware = multipart({ maxFieldsSize: 20971520 });
  }

  getMultipartMiddleware() {
    return this.multipartMiddleware;
  }
}
