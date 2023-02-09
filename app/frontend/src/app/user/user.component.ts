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
  public selectedRoles: string[] = [];
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
    });
    if (!this.userId) {
      this.editMode = false;
      this.userService.list(this.authService.getToken()).subscribe((users: IUser[]) => {
        this.users = users;
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

  public isRoleAssigned(user: IUser, role: string): boolean {
    if (undefined != user.email) {
      let result = user.roles.find(r => r === role);
      if (undefined != result) {
        if (!this.selectedRoles.find(r => r === result)) {
          this.selectedRoles.push(result);
        }

        return true;
      }

      return false;
    }

    return false;
  }

  public toggleRole(role: string): void {
    let isAssigned = this.selectedRoles.find(r => r === role);
    if (undefined == isAssigned) {
      this.selectedRoles.push(role);
    } else {
      this.selectedRoles.forEach((element, index) => {
        if (element === role) {
          this.selectedRoles.splice(index, 1)
        }
      });
    }
  }

  public submit(user: IUser) {
    user.roles = this.selectedRoles;
    this.userService.put(user, this.authService.getToken()).subscribe((user: IUser) => {
      this.user = user;
    });
  }

  public onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this.imageService.post(formData, this.authService.getToken()).subscribe((image) => {
      console.log(image);
      this.user.image = `/api/images/${image.id}`;
      this.userService.put(this.user, this.authService.getToken()).subscribe((user: IUser) => {
        this.user = user;
        this.editMode = false;
      });
    });

    console.log(event.target.files[0]);
  }

  public ngOnInit(): void {
    this.getUsers();
  }
}
