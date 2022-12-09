import {Component} from "@angular/core";
import { Router } from "@angular/router";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public login = '';
  public password = '';
  public constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  public submit() {
    this.authService.login(this.login, this.password);
    if (this.authService.getToken() !== '') {
      this.router.navigateByUrl('/');
    }
  }
}
