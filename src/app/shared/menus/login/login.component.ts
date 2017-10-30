import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _user: UserService, private _router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    this._user.login(username, password).then(x => {
      if (x) {
        this._router.navigate(['lazy']);
      }
    });
  }
}
