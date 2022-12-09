import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import { IUser } from "../model/user.model";

@Injectable()
export class AuthenticatedUserService {
  private url = 'http://authapi.local';
  private user: IUser = {} as IUser;

  constructor(private http: HttpClient) {
  }

  public post(token?: string) {
    let headers = new HttpHeaders();
    headers = token ? headers.append('Authorization', `Bearer ${token}`) : headers;

    this.http.post<IUser>(`${this.url}/api/authenticated_user`, {}, {headers}).subscribe((user) => {
      this.user = user;
    });
  }

  public getUser(): IUser {
    return this.user;
  }

  public unsetUser(): void {
    this.user = {} as IUser;
  }
}
