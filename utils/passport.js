const passport = require("passport")
// requires the model with Passport-Local Mongoose plugged in
const {UserModel} = require('../models/User');
 
// use static authenticate method of model in LocalStrategy
passport.initialize()
passport.session()

passport.use(UserModel.createStrategy());
 
// use static serialize and deserialize of model for passport session support
// {username: "foo", password: "bar"} => {username: "foo", hash: "465780ifcgvjkbiy"}
passport.serializeUser(UserModel.serializeUser());
// {username: "foo", hash: "465780ifcgvjkbiy"} => {username: "foo", password: "bar"} 
passport.deserializeUser(UserModel.deserializeUser());
