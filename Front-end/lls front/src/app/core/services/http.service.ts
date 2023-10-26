import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService,
    private loaderService: LoaderService
  ) {}

  get<T = any>(url: string, params = {}, showLoader = true): Observable<T> {
    if (showLoader) {
      this.loaderService.startLoader();
    }

    return this.http.get<T>(environment.baseUrl + url, { params }).pipe(
      map((response: T) => {
        if (showLoader) {
          this.loaderService.stopLoader();
        }
        return response;
      }),
      catchError((error) => {
        this.handleHttpError(error, showLoader);
        return throwError(error);
      })
    );
  }
  //put method
  putRequest<T = any>(
    url: string,
    body: {},
    showSpinner = true
  ): Observable<T> {
    if (showSpinner) {
      this.loaderService.startSprinner();
    }
    return this.http.put<T>(environment.baseUrl + url, body).pipe(
      map((response: T) => {
        if (showSpinner) {
          this.loaderService.stopSprinner();
        }
        return response;
      }),
      catchError((error) => {
        this.handleHttpError(error, showSpinner);
        return throwError(error);
      })
    );
  }
  getNext<Type = any>(url: string, showLoader = true): Observable<Type> {
    if (showLoader) {
      this.loaderService.startLoader();
    }
    return this.http.get<Type>(url).pipe(
      map((response: any) => {
        if (showLoader) {
          this.loaderService.stopLoader();
        }
        return response;
      }),
      catchError((error) => {
        this.handleHttpError(error, showLoader);
        return throwError(error);
      })
    );
  }

  post(url: string, body = {}, showSpinner = true): Observable<any> {
    if (showSpinner) {
      this.loaderService.startSprinner();
    }
    return this.http.post(environment.baseUrl + url, body).pipe(
      map((response: any) => {
        if (showSpinner) {
          this.loaderService.stopSprinner();
        }
        return response;
      }),
      catchError((error) => {
        this.handleHttpError(error, showSpinner);
        return throwError(error);
      })
    );
  }
  postRequest<T = any>(
    url: string,
    data: any,
    showSpinner = true
  ): Observable<T> {
    // return this.http.post<T>(environment.baseUrl + url, data);
    if (showSpinner) {
      this.loaderService.startSprinner();
    }
    return this.http.post(environment.baseUrl + url, data).pipe(
      map((response: any) => {
        if (showSpinner) {
          this.loaderService.stopSprinner();
        }
        return response;
      }),
      catchError((error) => {
        this.handleHttpError(error, showSpinner);
        return throwError(error);
      })
    );
  }
  getRe<T = any>(
    url: string,
    data: any,
    showLoader = true
  ): Observable<T> {
    // return this.http.post<T>(environment.baseUrl + url, data);
    if (showLoader) {
      this.loaderService.startLoader();
    }
    return this.http.get(environment.baseUrl + url, data).pipe(
      map((response: any) => {
        if (showLoader) {
          this.loaderService.stopLoader();
        }
        return response;
      }),
      catchError((error) => {
        this.handleHttpError(error, showLoader);
        return throwError(error);
      })
    );
  }
  postRe<T = any>(url: string, data: any): Observable<T> {
    return this.http.post<T>(environment.baseUrl + url, data);
  }
 
  getRequest<T = any>(url: string, showLoader = true): Observable<T> {
    // return this.http.get<T>(environment.baseUrl + url);
    if (showLoader) {
      this.loaderService.startLoader();
    }
    return this.http.get(environment.baseUrl + url).pipe(
      map((response: any) => {
        if (showLoader) {
          this.loaderService.stopLoader();
        }
        return response;
      }),
      catchError((error) => {
        this.handleHttpError(error, showLoader);
        return throwError(error);
      })
    );
  }
  //delete method
  deleteReq(url: string, body = {}, showSpinner = true): Observable<any> {
    // return this.http.delete<any>(environment.baseUrl + url, { body });
    if (showSpinner) {
      this.loaderService.startSprinner();
    }
    return this.http.delete(environment.baseUrl + url, { body }).pipe(
      map((response: any) => {
        if (showSpinner) {
          this.loaderService.stopSprinner();
        }
        return response;
      }),
      catchError((error) => {
        this.handleHttpError(error, showSpinner);
        return throwError(error);
      })
    );
  }
  // Handle Http Errores
  handleHttpError(error: any, showLoader: boolean): void {
    if (showLoader) {
      this.loaderService.stopLoader();
    }
    if (!error.ok) {
      if (error.status === 404) {
        this.router.navigate(['/errors/404']);
      } else if (error.status === 500) {
        this.router.navigate(['/errors/500']);
      } else {
      }
    }
  }
}
