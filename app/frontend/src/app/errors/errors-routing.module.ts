import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MaintenanceComponent} from "./maintenance/maintenance.component";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRouterModule {
}
