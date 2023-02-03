import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUser } from "../model/user.model";
import {environment} from "../../../environments/environment";
import {IImage} from "../model/image.model";

@Injectable()
export class AuthenticatedUserService {
  private user: IUser = {} as IUser;

  constructor(private http: HttpClient) {
  }

  public post(token?: string) {
    let headers = new HttpHeaders().set('Accept', 'application/json');
    headers = token ? headers.append('Authorization', `Bearer ${token}`) : headers;

    this.http.post<IUser>(`${environment.api_url}/api/authenticated_user`, {}, {headers}).subscribe((user) => {
      this.user = user;
      if (null != this.user.image) {
        this.http.get<IImage>(`${environment.api_url}/api/images/${this.user.image}`, {headers}).subscribe((image: IImage) => {
          this.user.imageContent = image;
        });
      }
    });
  }

  public getUser(): IUser {
    return this.user;
  }

  public unsetUser(): void {
    this.user = {} as IUser;
  }
}
