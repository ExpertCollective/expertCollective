import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
// import { Router } from '@angular/router';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { MenunavComponent } from "./header/menunav/menunav.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { LogInterceptor } from "./shared/log-interceptor";
import { SharedModule } from "./shared/shared.module";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenunavComponent,
    HomeComponent,
    PageNotFoundComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "expert-collective" }),
    AppRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  // constructor(router: Router) {
  //   // Use a custom replacer to display function names in the route configs
  //   const replacer = (key, value) => (typeof value === 'function') ? value.name : value;
  //   console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  // }
}
