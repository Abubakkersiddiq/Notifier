const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/notifier_local")

const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    password: String,
    source: String,
    createdDate: Date
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('userdetails', User, 'userdetails');
