import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {Router} from "@angular/router";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  private handleError(err: HttpErrorResponse): Observable<any>
  {
    if (err.status === 401) {
      this.router.navigate(['/login'], {skipLocationChange: true});

      return of(err.message);
    } else if (err.status === 403) {
      this.router.navigateByUrl('/errors/not-authorized', {skipLocationChange: true});

      return of(err.message);
    } else if (err.status === 404) {
      this.router.navigateByUrl('/errors/not-found', {skipLocationChange: true});

      return of(err.message);
    } else if (err.status === 0 || err.status >= 500) {
      this.router.navigateByUrl('/errors/maintenance', {skipLocationChange: true});

      return of(err.message);
    }

    return throwError(() => err);
  }
}
