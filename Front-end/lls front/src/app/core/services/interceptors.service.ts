import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';
import {
  catchError,
  empty,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class Interceptors implements HttpInterceptor {
  constructor(
    private localStorage: LocalStorageService,
    private httpService: AuthService,
    // private http: HttpService,
    private route: Router
  ) // private store: Store
  {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = request.clone({
      headers: new HttpHeaders({
        Authorization: this.localStorage.getLocal('token')
          ? `Bearer ${this.localStorage.getLocal('token')}`
          : '',
      }),
    });
    // return next.handle(token);
    return next.handle(token).pipe(
      catchError((error: any) => {
        if (error.url.includes('/Account/Confirm')) {
          // this.httpService.logoutSubj.next(true);
          this.route.navigate(['/']);
          return throwError(error);
        }
        if (error.status === 401 && error.error.message === 'token expired') {
          return this.reAuthenticate(error, token).pipe(
            switchMap(() => {
              const token = request.clone({
                headers: new HttpHeaders({
                  Authorization: this.localStorage.getLocal('token')
                    ? `Bearer ${this.localStorage.getLocal('token')}`
                    : '',
                }),
              });
              return next.handle(token);
            })
          );
        }
        // if (error.error instanceof ErrorEvent) {
        //   this.http.handleHttpError(error);
        // }
        // else {
        //   this.http.handleHttpError(error);
        // }

        return throwError(error);
      })
    );
  }
  reAuthenticate(error: any, langReq: any): Observable<any> {
    const refresh = this.localStorage.getLocal('refresh');
    if (
      this.localStorage.getLocal('token') !==
      langReq.headers.headers.get('authorization')[0].split(' ')[1]
    ) {
      return empty();
    }
    return this.httpService
      .postRequest('/api/Account/Confirm', { refresh })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.access);
        })
      );
  }
}
