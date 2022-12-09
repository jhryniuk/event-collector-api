import { NgModule } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { AuthenticatedUserService } from "./services/authenticated-user.service";
import { EventService } from "./services/event.service";
import { UserService } from "./services/user.service";

@NgModule({
  providers: [
    AuthService,
    EventService,
    UserService,
    AuthenticatedUserService,
  ],
})
export class SharedModule {
}
