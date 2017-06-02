const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema({
    id: String,
    name: String,
    profile: String
}, {
    _id: false,
    versionKey: false
});


const Member = mongoose.model('Member', MemberSchema, 'Member');

module.exports = Member;
module.exports.MemberSchema = MemberSchema;