/*import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('access_token');

    // If a token exists, clone the request and set the Authorization header
     if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    // Pass the cloned request instead of the original request to the next handler
   return next.handle(request);
  }
}
*/
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('access_token');

    // If a token exists, clone the request and set the Authorization header
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Pass the cloned request instead of the original request to the next handler
    return next.handle(request).pipe(
      catchError(err => {
        // Handle error responses
        if (err.status === 401) {
          // Redirect to login page if unauthorized
          this.router.navigate(['/login']);
        } else {
          // Optionally, log the error or show a message
          console.error('HTTP error occurred:', err);
        }

        // Re-throw the error to handle it further down the chain if necessary
        return throwError(err);
      })
    );
  }
}
