import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  private user: User;

  constructor(private userService: UserService) { this.user = new User(); }

  ngOnInit() {
  }

  public initiateRegistration(user: User) {
    this.userService.registration(user).subscribe(
      () => console.log('Proceeding to register new user.'),
      (error) => console.log('Error while registering user' + error),
      () => console.log('Completed registration'),
    );
  }

}
