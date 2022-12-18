import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { IUser } from "../model/user.model";
import { Observable } from "rxjs";
import { UriEncoder } from "./uri-encoder";

@Injectable()
export class UserService {
  private url = 'http://authapi.local';

  constructor(private http: HttpClient) {
  }

  public list(token?: string, page?: number): Observable<IUser[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = token ? headers.append('Authorization', `Bearer ${token}`) : headers;

    let params = new HttpParams({encoder: new UriEncoder()});
    params = page ? params.append('page', page) : params;

    return this.http.get<IUser[]>(`${this.url}/api/users`, {headers, params});
  }

  public post(user: IUser):Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/api/users`, {email: user.email, password: user.password, roles: user.roles})
  }
}
