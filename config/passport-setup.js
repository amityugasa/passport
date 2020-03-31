const passport = require('passport');
//const sendOtp = new SendOtp('AuthKey');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');
const FacebookTokenStrategy = require('passport-facebook').Strategy;
const fb = require('./fb');
const TwitterStrategy = require('passport-twitter')
const tw = require('./tw');
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log("Passport callback function fired");
        console.log(profile.id);
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                // already have a user
                // console.log('user is', currentUser);
                done(null, currentUser);
            } else {
                // if not , create new user
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile.thumbnail
                }).save().then((User) => {
                    // console.log('new user created', User);
                    done(null, User);
                });
            }
        })

    })
);
passport.use(
    new TwitterStrategy({
    consumerKey: tw.twitter.consumerKey,
    consumerSecret: tw.twitter.consumerSecret,
    callbackURL: "/auth/twitter/redirect"
  },
  (acessToken, refreshToken, profile, done) =>{
    User.findOne({ twitterId: profile.id }), then ((currentUser) => {
        if (currentUser) {
                // already have a user
                // console.log('user is', currentUser);
                done(null, currentUser);
            } else {
                // if not , create new user
                new User({
                    username: profile.displayName,
                    twitter: profile.id,
                    thumbnail: profile.thumbnail
                }).save().then((User) => {
                    // console.log('new user created', User);
                    done(null, User);
                });
            }
        })
         
    })
);
      
passport.use(new FacebookTokenStrategy({
    clientID: fb.facebook.clientID,
    clientSecret: fb.facebook.clientSecret,
    callbackURL: '/auth/facebook/redirect'
    
  },
  async(accessToken, refreshToken, profile, done) =>{
    try{ 
        console.log("Passport callback function fired");
        console.log(profile.id);
        User.findOne({ facebookId: profile.id }).then((currentUser) => {
            if (currentUser) {
                // already have a user
                // console.log('user is', currentUser);
                done(null, currentUser);
            } else {
                // if not , create new user
                new User({
                    username: profile.displayName,
                    facebookId: profile.id,
                    thumbnail: profile.thumbnail
                }).save().then((User) => {
                    // console.log('new user created', User);
                    done(null, User);
                });
            }
        })

    
    }catch(error){
        done(error,false, error.message);
    }
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));