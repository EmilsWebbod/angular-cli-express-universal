
export enum EHANDLER_STATUS {
  'SUCCESS' = 1, // Success
  'WARNING' = 2, // User did something wrong
  'INPUT' = 3, // Wrong Input
  'AUTHENTICATION' = 4, // User need to log in to do this action
  'ERROR' = 5 // Error on server.
}

export interface IHandler {
  status: number;
  msg: string;
  data: any;
}

/**
 * Template messages that could be used over the app for consistent messages
 * W_ : Warning messages
 * E_ : Error messages
 * I_ : Wrong Input message
 */
export const MSG = {
  success:    'Success',
  I_default:  'Input did not match criteria',
  W_login:    'Username and Password did not match existing user',
  W_register: 'Failed to register user',
  W_user_exist: 'User with username already exist'
};

export const Logger = require('winston');

export namespace Handler {

  /**
   * Parsing messages to user to a correct model. Consistent messaging
   * @param {number} status
   * @param {string} msg
   * @param data
   * @returns {IHandler}
   * @private
   */
  function _json_result(status: number, msg: string = '', data: any = null): IHandler {
    return {
      status: status,
      msg: msg,
      data: data
    };
  }

  /**
   * Logging errors from Ctrl if model error is not needed to users.
   * Will log errors to a logfile with Winston
   * @param msg
   */
  export const ctrlError = res => msg => error => {
    Logger.log('error', msg, error);
    return res(_json_result(EHANDLER_STATUS.ERROR, msg));
  }

  /**
   * If spesific errors in model need to be communicated to users.
   * Will log errors to a logfile with Winston
   * @param msg
   */
  export const modelError = msg => error => {
    Logger.log('error', msg, error);
    return _json_result(EHANDLER_STATUS.ERROR, msg);
  }

  /**
   * Error handling is done in model.
   * To add more ways to spesific error messages for user
   * Could also change it with res but will help to understand errors in ctrl.
   */
  export const ctrlModelError = res => res;

  export function success(msg: string = '', data: any = null): IHandler {
    return _json_result(EHANDLER_STATUS.SUCCESS, msg, data);
  }

  export function warning(msg: string): IHandler {
    return _json_result(EHANDLER_STATUS.WARNING, msg);
  }

  export function input(msg: string): IHandler {
    return _json_result(EHANDLER_STATUS.INPUT, msg);
  }

  export function auth(): IHandler {
    return _json_result(EHANDLER_STATUS.AUTHENTICATION, 'Please log in');
  }

  export function error(msg: string): IHandler {
    return _json_result(EHANDLER_STATUS.ERROR, msg);
  }
}
