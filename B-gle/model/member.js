const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    id: {type: String, unique: true},
    email: String,
    name: String,
    password: String,
    profile: String,

    friendList: [new mongoose.Schema({
        _id: String,
        name: String,
        profile: String,
        bookmark: {type: Boolean, default: false}
    })],
    groupList: [new mongoose.Schema({
            _id: String,
            background: String,
            title: String,
            bookmark: {type: Boolean, default: false}
    })]

}, {
    versionKey: false
});

MemberSchema.methods.signUp = function (info, thumbURL) {
    this.id = info.id;
    this.email = info.email;
    this.name = info.name;
    this.password = info.password;
    this.profile = thumbURL;
    return this.save();
};

MemberSchema.methods.isPassword = function (password) {
    return this.password === password;
};

MemberSchema.methods.addGroup = function (info) {
    this.groupList.push({_id: info.id, background: info.background, title: info.title});
    return this.save();
};
MemberSchema.methods.removeGroup = function (groupId) {
    this.groupList.pull({_id: groupId});
    return this.save();
};

MemberSchema.methods.addFriend = function (friend) {
    this.friendList.push({_id: friend.id, name: friend.name, profile: friend.profile});
    return this.save();
};

MemberSchema.methods.removeFriend = function (friendId) {
    this.friendList.pull(friendId);
    return this.save();
};

MemberSchema.methods.bookmarkFriend = function (friendId) {
    let findFriend = this.friendList.id(friendId);
    findFriend.bookmark = true;
    return this.save();
};

MemberSchema.methods.bookmarkGroup = function (groupId) {
    let findGroup = this.groupList.id(groupId);
    findGroup.bookmark = true;
    return this.save();
};

MemberSchema.statics.findMember = function (id) {
    return Member.findOne({id: id});
};


const Member = mongoose.models.Member ? mongoose.model('Member') : mongoose.model('Member', MemberSchema, 'Member');


module.exports = Member;