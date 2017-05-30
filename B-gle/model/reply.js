const mongoose = require('mongoose');

const ReplyScheme = mongoose.Schema({
    text : String
});


module.exports.ReplyScheme = ReplyScheme;

module.exports.Reply = mongoose.model('reply', ReplyScheme);