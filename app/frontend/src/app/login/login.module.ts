import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AsyncPipe,
    JsonPipe,
    FormsModule
  ],
  bootstrap: [
    LoginComponent
  ]
})
export class LoginModule {
}
