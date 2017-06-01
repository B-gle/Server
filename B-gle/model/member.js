const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema({
    id: String,
    name: String,
    profile: String
}, {
    versionKey: false
});


const Member = mongoose.model('Member', MemberSchema, 'Member');

module.exports = Member;
module.exports.MemberSchema = MemberSchema;