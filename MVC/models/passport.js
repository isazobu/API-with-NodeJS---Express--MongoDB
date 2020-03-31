var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

mongoose = require('mongoose');
User = require('./User');

const strategy = new LocalStrategy({ usernameField: "email" }, (username, password, done) => {
    User.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validatePassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
});

passport.use(strategy);

