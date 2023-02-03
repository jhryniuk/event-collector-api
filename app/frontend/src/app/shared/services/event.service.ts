import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IEvent} from "../model/event.model";
import {UriEncoder} from "./uri-encoder";
import {environment} from "../../../environments/environment";

@Injectable()
export class EventService {

  constructor(private http: HttpClient) {
  }

  public list(token?: string, page?: number): Observable<IEvent[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = token ? headers.append('Authorization', `Bearer ${token}`) : headers;

    let params = new HttpParams({encoder: new UriEncoder()});
    params = page ? params.append('page', `${page}`) : params

    return this.http.get<IEvent[]>(`${environment.api_url}/api/events`, {params, headers});
  }

  public get(token?: string, id?: number): Observable<IEvent> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = token ? headers.append('Authorization', `Bearer ${token}`) : headers;

    return this.http.get<IEvent>(`${environment.api_url}/api/events/${id}`, {headers});
  }

  public post(event: IEvent, token?: string): Observable<IEvent> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = token ? headers.append('Authorization', `Bearer ${token}`) : headers;
    return this.http.post<IEvent>(
      `${environment.api_url}/api/events`,
      {
        name: event.name,
        startDateTime: event.startDateTime.toLocaleString("pl-PL"),
        endDateTime: event.endDateTime.toLocaleString("pl-PL"),
        description: event.description,
        owner: event.owner,
        participants: event.participants,
      },
      {headers}
    );
  }

  public put(event: IEvent, token?: string): Observable<IEvent> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = token ? headers.append('Authorization', `Bearer ${token}`) : headers;

    return this.http.put<IEvent>(
      `${environment.api_url}/api/events/${event.id}`,
      {
        name: event.name,
        startDateTime: event.startDateTime.toLocaleString("pl-PL"),
        endDateTime: event.endDateTime.toLocaleString("pl-PL"),
        description: event.description,
        owner: event.owner,
        participants: event.participants,
      },
      {
        headers
      }
      );
  }
}
