import { Injectable } from '@angular/core';
import {ServerService} from './server.service';

@Injectable()
export class UserService {

  private _url = '/api/user/';

  constructor(private _server: ServerService) { }

  private get = (url: string) => this._server.get(`${this._url}${url}`);
  private post = (url: string) => (data: any) => this._server.post(`${this._url}${url}`)(data);

  public register(username, password) {
    return this.post('register')({username: username, password: password});
  }

  public login(username: string, password: string): Promise<any> {
    return this.post('login')({username: username, password: password});
  }

  public logout() {
    return this.get('logout');
  }
}
