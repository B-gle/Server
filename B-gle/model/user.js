const mongoose = require('mongoose');
const MemberSchema = require('./member').MemberSchema;

const UserSchema = new mongoose.Schema({
    id: {type: String, unique: true},
    email: String,
    name: String,
    password: String,
    profile: String,
    friendList: [MemberSchema],
    groupList: [new mongoose.Schema({groupId: String, background: String, title: String})]
}, {
    versionKey: false
});

UserSchema.methods.signUp = function (info, thumbURL) {
    this.id = info.id;
    this.email = info.email;
    this.name = info.name;
    this.password = info.password;
    this.profile = thumbURL;
    return this.save();
};
UserSchema.methods.addGroup = function (info) {
    this.groupList.push({groupId: info.id, background: info.background, title: info.title});
    return this.save();
};
UserSchema.statics.findUser = function (id) {
    return User.findOne({id: id});
};


const User = mongoose.models.User ? mongoose.model('User') : mongoose.model('User', UserSchema, 'User');


module.exports = User;