import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IEvent} from "../model/event.model";
import {UriEncoder} from "./uri-encoder";

@Injectable()
export class EventService {
  private url = 'http://authapi.local';

  constructor(private http: HttpClient) {
  }

  public list(token?: string, page?: number): Observable<IEvent[]> {
    let headers = new HttpHeaders()
    headers = token ? headers.append('Authorization', `Bearer ${token}`) : headers;

    let params = new HttpParams({encoder: new UriEncoder()});
    params = page ? params.append('page', `${page}`) : params

    return this.http.get<IEvent[]>(`${this.url}/api/events`, {params, headers});
  }
}
