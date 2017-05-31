const mongoose = require('mongoose');

const MemberScheme = mongoose.Schema({
    id: String,
    profile: String
}, {
    versionKey: false
});


const Member = mongoose.model('Member', MemberScheme, 'Member');

module.exports = Member;
module.exports.MemberScheme = MemberScheme;