const mongooose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

mongooose.connect("mongodb://localhost:27017/notifier_local")

const Schema = mongooose.Schema;

const ReminderData = new Schema({
    cameraName: String,
    ipAddress: String,
    expiryDate: Date,
    reminderDate: Date,
    createdDate: Date,
})

ReminderData.plugin(passportLocalMongoose);

module.exports = mongooose.model('reminderdetails', ReminderData, 'reminderdetails');