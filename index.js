const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys.js");

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "674768788324-nj3qg4lie4mnoqg2huo4cjrc83sdmq02.apps.googleusercontent.com",
      clientSecret: "qgirIeK-DyvAmbREd2nBtpeM",
      callbackURL: "/auth/google/callback"
    },
    accesToken => {
      console.log("accesToken: ", accesToken);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

app.get("/auth/google/callback", passport.authenticate("google"));

const PORT = process.env.PORT || 5000;

app.listen(PORT);
