'use strict';
import {User} from '../models/user.model';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

export = app => {
  /**
   * Init Passport
   */
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id).exec().then(user => {
      done(null, user);
    }, err => done(err, null));
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({'username': username}).exec().then(user => {
        if (!user) { return done(true, null); }
        user.authenticate(password, (err, res) => {
          if (err || !res) { return done(true, null); }
          done(null, user);
        });
      }, err => done(true, null));
    }
  ));
};
