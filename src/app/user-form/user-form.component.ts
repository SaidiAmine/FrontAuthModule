import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user = new User();
  }

  onSubmit() {
    console.log('DEBUG: submit method');
    this.userService.authenticate(this.user);
  }

  /*onUserClick() {
    console.log('DEBUG: onUserClick method');
    this.userService.getLoggedUser();
  }*/


  ngOnInit() {
  }

}
