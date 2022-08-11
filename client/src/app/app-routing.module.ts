import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { SelectivePreloadingStrategyService } from "./selective-preloading-strategy-service.service";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "advisory",
    loadChildren: () =>
      import("./advisory/advisory.module").then((mod) => mod.AdvisoryModule),
  },
  {
    path: "praxis",
    loadChildren: () =>
      import("./praxis/praxis.module").then((mod) => mod.PraxisModule),
  },
  {
    path: "ventures",
    loadChildren: () =>
      import("./ventures/ventures.module").then((mod) => mod.VenturesModule),
  },
  { path: "about-us", component: AboutUsComponent },
  {
    path: "contact-us",
    loadChildren: () =>
      import("./contact-us/contact-us.module").then(
        (mod) => mod.ContactUsModule
      ),
    data: { preload: true },
  },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false, // <-- debugging purposes only
      initialNavigation: "enabledBlocking",
      preloadingStrategy: SelectivePreloadingStrategyService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
