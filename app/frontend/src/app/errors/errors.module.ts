import {NgModule} from "@angular/core";
import {MaintenanceComponent} from "./maintenance/maintenance.component";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ErrorsRouterModule} from "./errors-routing.module";

@NgModule({
  declarations: [
    MaintenanceComponent,
    NotAuthorizedComponent,
    NotFoundComponent,
  ],
  imports: [
    ErrorsRouterModule
  ]
})
export class ErrorModule {
}
