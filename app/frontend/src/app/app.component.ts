import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { AuthenticatedUserService } from "./shared/services/authenticated-user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'authapi';

  public constructor(
    public authService: AuthService,
    public authenticatedUserService: AuthenticatedUserService
  ) {
  }

  public logout() {
    this.authService.logout();
  }
}
