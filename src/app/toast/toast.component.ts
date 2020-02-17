import {Component, OnInit} from '@angular/core';
import {Toast, ToastPackage, ToastrService} from 'ngx-toastr';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-toast',
  styleUrls: ['./toast.component.css'],
  templateUrl: './toast.component.html',

})
export class ToastComponent implements OnInit {

  undoString = 'undo';

  constructor( ) {  }

  ngOnInit() {
  }

}
