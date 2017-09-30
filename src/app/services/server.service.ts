import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IResponse, ResponseService} from './response/response.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ServerService {
  constructor(private _http: HttpClient, private _r: ResponseService) {}

  public get = (url: string) => {
    this._r.load(`Get --- ${url}`);
    return this.withHandler(this._http.get<IResponse>(url));
  }
  public post = (url: string) => data => {
    this._r.load(`Post --- ${url}`);
    return this.withHandler(this._http.post<IResponse>(url, data));
  }
  public patch = (url: string) => data => {
    this._r.load(`Patch --- ${url}`);
    return this.withHandler(this._http.patch<IResponse>(url, data));
  }
  public put = (url: string) => data => {
    this._r.load(`Put --- ${url}`);
    return this.withHandler(this._http.put<IResponse>(url, data));
  }
  public delete = (url: string) => {
    this._r.load(`Delete --- ${url}`);
    return this.withHandler(this._http.delete<IResponse>(url));
  }

  /** Not using default handler. So Response is not a IResponse Object */
  public getWithHandler = handler => (url: string) => {
    this._r.load(`Get --- ${url}`);
    return this.noHandler(this._http.get<any>(url))(handler);
  }
  public postWithHandler = handler => (url: string) => data => {
    this._r.load(`Post --- ${url}`);
    return this.noHandler(this._http.post<any>(url, data))(handler);
  }

  private toPromise   = http => catcher => handler => http.toPromise().then(handler).catch(catcher);
  private asPromise   = http => this.toPromise(http);
  private noHandler   = http => this.toPromise(http)(this._r.catch);
  private withHandler = http => this.noHandler(http)(this._r.handle);
}
