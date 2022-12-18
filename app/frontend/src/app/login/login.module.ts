import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        AsyncPipe,
        JsonPipe,
        FormsModule,
        RouterLink
    ],
  bootstrap: [
    LoginComponent
  ]
})
export class LoginModule {
}
