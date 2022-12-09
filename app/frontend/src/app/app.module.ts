import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { LoginModule } from "./login/login.module";
import { HomeComponent } from "./home/home.component";
import { EventComponent } from './event/event.component';
import { UserComponent } from "./user/user.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
