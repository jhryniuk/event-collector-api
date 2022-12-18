import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "../shared/model/user.model";
import { UserService } from "../shared/services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public user: IUser = {} as IUser;
  public constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  public register() {
    this.user.roles = [];
    this.userService.post(this.user).subscribe(() => {
      this.router.navigateByUrl('')
    }, () => {
      this.router.navigateByUrl('');
    }, () => {
      this.router.navigateByUrl('');
    });
  }
}
