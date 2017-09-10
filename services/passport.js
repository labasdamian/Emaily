const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys.js");

const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.clientID,
      clientSecret: keys.clientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accesToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // don't create new user
        } else {
          new User({ googleId: profile.id }).save();
        }
      });
    }
  )
);
