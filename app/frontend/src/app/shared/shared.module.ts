import { NgModule } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { AuthenticatedUserService } from "./services/authenticated-user.service";
import { EventService } from "./services/event.service";
import { ImageService } from "./services/image.service";
import { UserService } from "./services/user.service";
import {RoleService} from "./services/role.service";

@NgModule({
  providers: [
    AuthService,
    EventService,
    UserService,
    AuthenticatedUserService,
    ImageService,
    RoleService,
  ],
})
export class SharedModule {
}
