import {Component} from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "../shared/model/user.model";
import { AuthService } from "../shared/services/auth.service";
import { UserService } from "../shared/services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  public users: IUser[] = [];
  public constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {

  }

  public ngOnInit(): void {
    if (this.authService.getToken() !== '') {
      this.userService.list(this.authService.getToken()).subscribe((users: IUser[]) => {
        this.users = users;
      }, () => {
        this.authService.logout();
        this.router.navigateByUrl('');
      });
    } else {
      this.router.navigateByUrl('')
    }
  }
}
