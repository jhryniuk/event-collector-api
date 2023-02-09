import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IImage} from "../model/image.model";
import {UriEncoder} from "./uri-encoder";
import {environment} from "../../../environments/environment";

@Injectable()
export class ImageService {
  constructor(private http: HttpClient) {
  }

  public list (token?: string, page?: number): Observable<IImage[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = token ? headers.append('Authorization', `Bearer ${token}`) : headers;

    let params = new HttpParams({encoder: new UriEncoder()});
    params = page ? params.append('page', `${page}`) : params

    return this.http.get<IImage[]>(`${environment.api_url}/api/images`, {params, headers});
  }

  public get (token?: string, id?: number): Observable<IImage> {
    let headers = new HttpHeaders().set('Accept', 'application/json');
    headers = token ? headers.append('Authorization', `Bearer ${token}`) : headers;

    return this.http.get<IImage>(`${environment.api_url}/api/images/${id}`, {headers});
  }

  public post(formData: FormData, token?: string): Observable<IImage> {
    let headers = new HttpHeaders().set('Accept', 'application/json');
    headers = token ? headers.append('Authorization', `Bearer ${token}`) : headers;

    return this.http.post<IImage>(`${environment.api_url}/api/images`, formData, {headers});
  }
}
