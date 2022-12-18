import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticatedUserService} from "./authenticated-user.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  private url = 'http://authapi.local';
  private token = '';

  constructor(
    private http: HttpClient,
    private authenticatedUserService: AuthenticatedUserService,
    private router: Router
  ) {
  }

  public login(username: string, password: string) {
    this.post(username, password).subscribe((result: {token: string}) => {
      this.token = result.token;
      this.authenticatedUserService.post(this.token);
      if ('' !== this.token) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login');
      }
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
    return this.http.post<{token: string}>(`${this.url}/authentication_token`, {email, password})
  }
}
