const mongoose = require('mongoose');

const ReplyScheme = mongoose.Schema({
    writer: String,
    text: String,
    date: { type:Date, default:Date.now }
});


module.exports.ReplyScheme = ReplyScheme;

module.exports.Reply = mongoose.model('reply', ReplyScheme);