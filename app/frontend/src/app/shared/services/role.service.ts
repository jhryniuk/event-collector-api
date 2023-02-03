import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRole} from "../model/role.model";
import {UriEncoder} from "./uri-encoder";
import {environment} from "../../../environments/environment";

@Injectable()
export class RoleService {
  constructor(private http: HttpClient) {
  }

  public list(token?: string, page?: number): Observable<IRole> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = token ? headers.append('Authorization', `Bearer ${token}`) : headers;

    let params = new HttpParams({encoder: new UriEncoder()});
    params = page ? params.append('page', page) : params;

    return this.http.get<IRole>(`${environment.api_url}/security/roles`, {headers, params});
  }
}
