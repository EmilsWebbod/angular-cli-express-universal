import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _user: UserService) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    this._user.login(username, password).then(x => {
      console.log(x);
    });
  }
}
