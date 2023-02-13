import {Component, TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { AuthenticatedUserService } from "./shared/services/authenticated-user.service";
import { ToastService } from './shared/services/toast-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'authapi';

  public constructor(
    public authService: AuthService,
    public authenticatedUserService: AuthenticatedUserService,
    private router: Router,
    public toastService: ToastService
  ) {
  }

  public isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  public logout() {
    this.authService.logout();
  }
}
