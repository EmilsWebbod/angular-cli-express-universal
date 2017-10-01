
import {Handler, Logger, MSG} from '../utils/handler';
import {User} from '../models/user.model';

const passport = require('passport');

export namespace UserCtrl {

  function setCookie(req) {
    const _extend = 30 * 24 * 60 * 60 * 1000;
    req.session.cookie.expires = new Date(Date.now() + _extend);
    req.session.cookie.maxAge = _extend;
    req.session.regenerate(() => {});
  }

  export function login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err || !user) { return res.json(Handler.warning(MSG.W_login)); }
      req.login(user, login_error => {
        if (login_error) { return res.json(Handler.warning(MSG.W_login)); }
        if (req.body.remember) { setCookie(req); }
        return res.json(Handler.success('User logged in'));
      });
    })(req, res, next);
  }

  export function register(username, password) { return new Promise(res => {
    if (!username || !password) { return res(Handler.input(MSG.I_default)); }
    User.register(User.initUser(username), password, (err, user) => {
      if (err || !user) { return Handler.ctrlError(res)(MSG.W_user_exist)(err); }
      return res(Handler.success('User registered'));
    });
  }); }

  export function logout(req) { return new Promise(res => {
    req.logout();
    res(Handler.success('User logged out'));
  }); }

  export function test() { return new Promise(res => {
    User.test().then(test => {
      res(Handler.success());
    }, Handler.ctrlModelError(res));
  }); }
}
