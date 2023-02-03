import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { IUser } from "../model/user.model";
import { Observable } from "rxjs";
import { UriEncoder } from "./uri-encoder";
import {environment} from "../../../environments/environment";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  public list(token?: string, page?: number): Observable<IUser[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = token ? headers.append('Authorization', `Bearer ${token}`) : headers;

    let params = new HttpParams({encoder: new UriEncoder()});
    params = page ? params.append('page', page) : params;

    return this.http.get<IUser[]>(`${environment.api_url}/api/users`, {headers, params});
  }

  public get(token?: string, id?: number): Observable<IUser> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers = token ? headers.append('Authorization', `Bearer ${token}`) : headers;

    return this.http.get<IUser>(`${environment.api_url}/api/users/${id}`, {headers});
  }

  public post(user: IUser):Observable<IUser> {
    return this.http.post<IUser>(`${environment.api_url}/api/users`, {email: user.email, password: user.password, roles: user.roles})
  }
}
