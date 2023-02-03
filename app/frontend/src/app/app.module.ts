import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { LoginModule } from "./login/login.module";
import { HomeComponent } from "./home/home.component";
import { EventComponent } from './event/event.component';
import { UserComponent } from "./user/user.component";
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import {NgbAlertModule, NgbDatepickerModule, NgbTimepicker, NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {HttpErrorInterceptor} from "./errors/http-error.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventComponent,
    UserComponent,
    RegisterComponent,
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      SharedModule,
      LoginModule,
      FormsModule,
      NgbDatepickerModule,
      NgbAlertModule,
      NgbToast,
      NgbTimepicker,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
