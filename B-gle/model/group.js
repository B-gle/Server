const mongoose = require('mongoose');
const MemberSchema = require('./member').MemberSchema;

const GroupSchema = mongoose.Schema({
    title: String,
    background: String,
    memberList: [MemberSchema]
}, {
    versionKey: false
});


GroupSchema.methods.setInfo = function (title, background) {
    this.title = title;
    this.background = background;
    return this.save();
};

GroupSchema.methods.addMember = function (member) {
    this.memberList.push({id: member.id, name: member.name, profile: member.profile});
    return this.save();
};

GroupSchema.statics.changeTitle = function (id, title) {
    return this.update({_id: id}, {$set: {title: title}});
};

GroupSchema.statics.findGroup = function (id) {
    return this.findOne({_id: id});
};


const Group = mongoose.model('Group', GroupSchema, 'Group');


module.exports = Group;
module.exports.GroupSchema = GroupSchema;