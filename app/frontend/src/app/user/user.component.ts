import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {IUser} from "../shared/model/user.model";
import {AuthService} from "../shared/services/auth.service";
import {UserService} from "../shared/services/user.service";
import {ImageService} from "../shared/services/image.service";
import {IImage} from "../shared/model/image.model";
import {environment} from "../../environments/environment";
import {IRole} from "../shared/model/role.model";
import {RoleService} from "../shared/services/role.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  public userId?: number;
  public users: IUser[] = [];
  public user: IUser = {} as IUser;
  public url = environment.api_url;
  public editMode = false;
  public roles: IRole = {} as IRole;
  public constructor(
    private authService: AuthService,
    private userService: UserService,
    private imageService: ImageService,
    private router: Router,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userId = parseInt(<string>this.activatedRoute.snapshot.paramMap.get('user'), 10);
  }

  public getUsers(): void {
    this.roleService.list(this.authService.getToken()).subscribe((roles: IRole) => {
      this.roles = roles;
      console.log(roles.roles);
    });
    if (!this.userId) {
      this.editMode = false;
      this.userService.list(this.authService.getToken()).subscribe((users: IUser[]) => {
        this.users = users;
      }, () => {
      });
    } else {
      this.userService.get(this.authService.getToken(), this.userId).subscribe((user: IUser) => {
        this.user = user;
        if (this.user.image) {
          let imageId = parseInt(this.user.image.split('/')[3], 10);
          this.imageService.get(this.authService.getToken(), imageId).subscribe((image: IImage) => {
            this.user.imageContent = image;
          });
        }
      });
    }
  }

  public ngOnInit(): void {
    this.getUsers();
  }
}
