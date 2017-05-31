const mongoose = require('mongoose');
const MemberScheme = require('./member').MemberScheme;

const UserSchema = new mongoose.Schema({
    id: {type: String, unique: true},
    email: String,
    lastName: String,
    firstName: String,
    password: String,
    profile: String,
    friendList: [MemberScheme],
    groupList: [{groupid: String}]
}, {
    versionKey: false
});

UserSchema.methods.signUp = function (info, thumbURL) {
    this.id = info.id;
    this.email = info.email;
    this.lastName = info.lastName;
    this.firstName = info.firstName;
    this.password = info.password;
    this.profile = thumbURL;
    return this.save();
};
UserSchema.methods.addGroup = function (id) {
    this.groupList.push({groupid:id});
    return this.save();
};
UserSchema.statics.findUser = function (id) {
    return User.findOne({id: id});
};



const User = mongoose.models.User ? mongoose.model('User') : mongoose.model('User', UserSchema, 'User');


module.exports = User;