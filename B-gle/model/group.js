const mongoose = require('mongoose');
const Member = require('./member').MemberScheme;

const GroupScheme = mongoose.Schema({
    title: String,
    color: String,
    memberList: [Member]
}, {
    versionKey: false
});


GroupScheme.methods.setInfo = function (title, color) {
    this.title = title;
    this.color = color;
    return this.save();
};
GroupScheme.methods.addMember = function (id) {
    this.memberList.push(id);
    return this.save();
};
GroupScheme.statics.changeTitle = function(id,title){
    return this.update({_id:id},{$set: {title:title}});
}
GroupScheme.statics.findGroup = function (id) {
    return this.findOne({_id:id});
};


const Group = mongoose.model('Group', GroupScheme, 'Group');


module.exports = Group;
module.exports.GroupScheme = GroupScheme;