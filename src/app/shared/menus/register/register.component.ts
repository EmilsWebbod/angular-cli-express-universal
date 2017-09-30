import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _user: UserService) { }

  ngOnInit() {}

  register(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    this._user.register(username, password).then(x => {
      console.log(x);
    });
    return false;
  }
}
