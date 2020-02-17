import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {ToastrService} from 'ngx-toastr';
import {ApiResponse} from '../model/ApiResponse';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  apiResponse: ApiResponse;

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('id_token');
    console.log('DEBUG: Inside interceptor');

    req = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

    if (idToken !== null) {
      const cloned = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        })
      });
      console.log('DEBUG: interceptor: header: Content-Type: ' + cloned.headers.get('Content-Type') + ' Authorization: '
        + cloned.headers.get('Authorization'));
      return this.myHandler(cloned, next);
    } else if (idToken == null) {
      console.log('DEBUG: id_token empty');
      return this.myHandler(req, next);
    }
  }

  // adding pipe to every request to handle 401 responses => redirect user to login.
  public myHandler(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(() => {
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log('DEBUG: Error in interceptor response');
          if (err.status !== 401) {
            this.apiResponse = JSON.parse(JSON.stringify(err.error));
            this.toastr.error(this.apiResponse.message, this.apiResponse.title);
            return;
          }
          this.userService.unValidateUser();
          this.router.navigate(['/login']);
        }
      }));
  }
}

