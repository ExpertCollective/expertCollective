import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LogInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone and modify your HTTPRequest using req.clone()
    // or perform other actions here

    console.log(`I've intercepted your HTTP request! ${JSON.stringify(req, null, 2)}`);

    return next.handle(req);
  }
}