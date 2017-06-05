const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
    title: String,
    background: String,
    memberList: [new mongoose.Schema({_id: String, name: String, profile: String})],
}, {
    versionKey: false
});


GroupSchema.methods.setInfo = function (title, background) {
    this.title = title;
    this.background = background;
    return this.save();
};

GroupSchema.methods.addMember = function (member) {
    this.memberList.push({_id: member.id, name: member.name, profile: member.profile});
    return this.save();
};

GroupSchema.methods.removeMember = function (id) {
    this.memberList.pull(id);
    return this.save();
};
GroupSchema.methods.findMember = function(id){
    return this.memberList.id(id);
};

GroupSchema.methods.changeTitle = function(title){
    this.title = title;
    return this.save();
};

GroupSchema.statics.removeGroup = function (id) {
    return this.deleteOne({_id: id});
};

GroupSchema.statics.findGroup = function (id) {
    return this.findOne({_id: id});
};


const Group = mongoose.model('Group', GroupSchema, 'Group');


module.exports = Group;
module.exports.GroupSchema = GroupSchema;