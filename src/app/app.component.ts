import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'untitled';

  private notificationSubscription: Subscription;
  private isLogged: boolean;

  constructor(private userService: UserService) {
    // subscribing to the notification emitter
    // so the app component gets the state change of the user (logged)
    this.isLogged = UserService.instance.getIsLogged();
    this.notificationSubscription = this.userService.notificationSubscriber.subscribe(
      value => {this.isLogged = value; console.log('INFO: Recieved user stated in AppComp: ' + this.isLogged ); });
  }

  public logOut() {
    this.userService.logOutUser();
  }

  ngOnDestroy() {
    // Release subscription to avoid memory leaks when the component is destroyed
    this.notificationSubscription.unsubscribe();
  }



}
