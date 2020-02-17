import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
  }

  public showToastr() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  public showToastr2() {
    this.toastr.error('Hello world!', 'Toastr fun!');
  }
}
