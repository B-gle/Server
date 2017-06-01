const mongoose = require('mongoose');

const ReplySchema = mongoose.Schema({
    writer: String,
    text: String,
    date: { type:Date, default:Date.now }
});


module.exports.ReplySchema = ReplySchema;

module.exports.Reply = mongoose.model('reply', ReplySchema);