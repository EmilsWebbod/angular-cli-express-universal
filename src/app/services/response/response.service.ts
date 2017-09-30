
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {isPlatformBrowser} from '@angular/common';
import {Router} from '@angular/router';

let self: ResponseService = null;

export enum STATUS {
  SUCCESS = 1, // Success
  WARNING = 2, // User did something wrong
  INPUT = 3, // Wrong Input
  AUTHENTICATION = 4, // User need to log in to do this action
  ERROR = 5 // Error on server.
}


export enum LOADER {
  DISABLED = 0,
  SUCCESS,
  LOADING,
  ERROR,
  USER_ERROR, // This is used when printing error message to DOM
  USER_MSG,
  REDIRECT,
  TIMEOUT,
  AUTHENTICATE
}

export interface IResponse {
  status: number;
  msg: string;
  data: any;
}

@Injectable()
export class ResponseService {

  private _loading = new BehaviorSubject<LOADER>(LOADER.DISABLED);
  public loading$ = this._loading.asObservable();

  public response: IResponse = null;
  public loaderMessage = '';

  constructor(@Inject(PLATFORM_ID) private platformId, private _router: Router) { self = this; }

  public getLoader() { return this.loading$; }
  public pending() { return this._loading.getValue(); }
  public disable() {this._loading.next(LOADER.DISABLED); }
  public isLoading() {return this._loading.getValue() === LOADER.LOADING; }
  public showMessage(type: string, msg: string, header: string) {
    if (isPlatformBrowser(this.platformId)) {

    }
  }

  /**
   * Prints the message out to screen while loading.
   * If the the request is important redirect to correct place if failed
   * @param message
   * @param redirectUrl
   */
  public load(message?: string, redirectUrl?: string) {
    this.loaderMessage = message ? message : 'Loading';

    this._loading.next(LOADER.LOADING);
  }

  /**
   * Catch any errors from server.
   * @param error
   */
  public catch (error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Could not connect to server';
    console.error('Error:', error); // log to console instead
    self.showMessage('error', errMsg, 'Error');
    self.disable();
  }

  /** OBS Promise function. Use self to access functions outside promise **/
  public handle (res: IResponse): any {
    const response: IResponse = res;
    if (!response) { console.error('Not valid API boy!'); }
    console.log('Response:', response.status, response.msg, response.data);
    return self.__base(response);
  }

  /**
   * What type of Toaster we should post. Will change color and icon depending on type.
   * @param {STATUS} status
   * @returns {any}
   * @private
   */
  private _getResponseType(status: STATUS) {
    switch (status) {
      case STATUS.SUCCESS:          return 'success';
      case STATUS.AUTHENTICATION:   return 'error';
      default:                      return 'warning';
    }
  }

  /**
   * Get the correct Header for Toaster. Will change depending on Status from server.
   * @param {STATUS} status
   * @returns {any}
   * @private
   */
  private _getResponseMessageHeader(status: STATUS) {
    switch (status) {
      case STATUS.SUCCESS:        return 'Success';
      case STATUS.WARNING:        return 'Warning';
      case STATUS.AUTHENTICATION: return 'Authentication';
      case STATUS.INPUT:          return 'Input Error';
      case STATUS.ERROR:          return 'Server error';
      default:                    return 'warning';
    }
  }

  /**
   * Not all responses need to return data of value. And always return false when error occurs.
   * @param {IResponse} res
   * @returns {any}
   * @private
   */
  private _getResponseValue(res: IResponse) {
    switch (res.status) {
      case STATUS.SUCCESS: return res.data || true;
      case STATUS.INPUT: return res;
      default: return false;
    }
  }

  /**
   * Base function forn response handler.
   * It saves the response and display message if needed.
   * Will disable loader on top of screen and return the correct values from server.
   * @param {IResponse} res
   * @returns {any | boolean | IResponse}
   * @private
   */
  private __base = (res: IResponse) => {
    self.response = res;
    if (res.status !== STATUS.SUCCESS) {
      self.showMessage(this._getResponseType(res.status), res.msg, this._getResponseMessageHeader(res.status));
    }
    self.disable();
    return this._getResponseValue(res);
  }

  /**
   * Timeoute. Will post message to user and disabled loader.
   */
  public timeout() {
    console.error('Timeout');
    self.showMessage('error', 'Could not connect to server', 'Server error');
    self.disable();
  }
}
