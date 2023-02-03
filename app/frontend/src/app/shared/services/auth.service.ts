import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticatedUserService} from "./authenticated-user.service";
import {Router} from "@angular/router";
import {ToastService} from "./toast-service";
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthService {
  private token = '';

  constructor(
    private http: HttpClient,
    private authenticatedUserService: AuthenticatedUserService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  public login(username: string, password: string) {
    this.post(username, password).subscribe((result: {token: string}) => {
      this.token = result.token;
      this.authenticatedUserService.post(this.token);
      if ('' !== this.token) {
        this.router.navigateByUrl('/');
        this.toastService.show('Successfully authenticated!', {classname: 'bg-success text-light', delay: 3000});
      } else {
        this.router.navigateByUrl('/login');
        this.toastService.show('Incorrect username or password!', {classname: 'bg-danger text-light', delay: 3000});
      }
    }, () => {
      this.toastService.show('Incorrect username or password!', {classname: 'bg-danger text-light', delay: 3000});
    });
  }

  public logout() {
    this.token = '';
    this.authenticatedUserService.unsetUser();
    this.router.navigateByUrl('/login')
  }

  public getToken(): string {
    return this.token;
  }

  private post(
    email: string,
    password: string
  ): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${environment.api_url}/authentication_token`, {email, password})
  }
}
