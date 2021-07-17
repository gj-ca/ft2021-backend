const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({})

UserSchema.plugin(passportLocalMongoose, {
    passwordValidator: (password, cb) => {
        if (password.length < 8) {
            return cb({message: "Password must be greater than 7 characters"})
        }
        if (!password.includes("$")) {
            return cb({message: "Password must include $"})
        }
        return cb()
    }
});

const UserModel = mongoose.model("User", UserSchema)

module.exports = {
    UserSchema,
    UserModel
}