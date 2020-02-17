import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {Token} from '../model/token';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /*This is the user service that operates the athentication's http requests
  and is built in a Singleton Pattern ( Only 1 instance in the app)*/
  static instance: UserService;

  public user: User;

  private isLogged;

  private token: Token;

  private url: string;
  private currentLoggedUrl: string;
  private adminUrl: string;
  private meUrl: string;
  private logoutUrl: string;
  private registerUrl: string;

  //
  private notification = new Subject<boolean>();
  // Observable boolean streams
  notificationSubscriber = this.notification.asObservable();

  //
  constructor(private http: HttpClient, private router: Router) {
    if (!UserService.instance) {
      UserService.instance = this;
      console.log('DEBUG: UserService instantiated.');
      this.url = 'http://localhost:8080/auth';
      this.adminUrl = 'http://localhost:8080/admin';
      this.currentLoggedUrl = 'http://localhost:8080/currentLoggedUser';
      this.meUrl = 'http://localhost:8080/me';
      this.logoutUrl = 'http://localhost:8080/logout';
      this.registerUrl = 'http://localhost:8080/user/registration';
      this.checkUserIsActive();
    }
    return UserService.instance;
  }

  //
  validateUser() {
    this.isLogged = true;
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    this.notify();
    console.log('INFO: Validated user');
  }

  unValidateUser() {
    this.isLogged = false;
    localStorage.removeItem('id_token');
    localStorage.removeItem('loggedUser');
    this.notify();
    console.log('INFO: Unvalidated user');
  }

  //
  checkUserIsActive() {
    if (localStorage.getItem('id_token') && localStorage.getItem('loggedUser')) {
      this.validateUser();
    } else {
      this.unValidateUser();
    }
  }

  public getIsLogged() {
    return this.isLogged;
  }

  public authenticate(user: User) {
    console.log('DEBUG: Inside authenticate method, proceeding to http post.');

    return this.http.post(this.url, JSON.stringify(user)).subscribe(
      (data: Token) => this.token = {id_token: data['token']},
      err => {
        console.error();
      },
      () => {
        this.saveDataLocalStorage('id_token', this.token.id_token);
        this.getCurrentUserData()
          .subscribe(
            (response: User) => this.user = response,
            (err) => {
              console.log('ERROR while fetching current user data' + err);
            },
            () => {
              this.saveDataLocalStorage('loggedUser', JSON.stringify(this.user));
              this.isLogged = true;
              this.router.navigate(['/home']);
              this.notify();
            });
      }
    );
  }

  public saveDataLocalStorage(nameItem: string, item: string) {
    localStorage.setItem(nameItem, item);
    console.log('DEBUG: saved ' + nameItem + ' in local storage');
  }

  public getCurrentUserData() {
    console.log('DEBUG: inside getCurrentUserData');
    return this.http.get(this.meUrl);
  }

  public logOutUser() {
     this.http.get(this.logoutUrl).subscribe(
      () => console.log('INFO: Proceeding logout'),
      err => console.log('ERROR in Logout: ' + err),
      () => {
        console.log('Logout successful');
        this.unValidateUser();
        this.router.navigate(['/home']);
      });
  }

  /*public getLoggedUser() {
    console.log('DEBUG: Inside getLoggedUser method, proceeding to http get.');

    return this.http.get(this.currentLoggedUrl, ).subscribe(
      (response: User) => this.user = response,
      err => console.log(err),
      () => console.log('DEBUG: current logged user data: ' + JSON.stringify(this.user)));
  }*/

  public notify() {
    console.log('INFO: Notifying subscribers to user\'s state: ' + this.isLogged);
    this.notification.next(this.getIsLogged());
  }

  public registration(user: User) {
    return this.http.post(this.registerUrl, user);
  }

}
