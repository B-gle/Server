const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    writer: String,
    message: String,
    date: { type:Date, default:Date.now }
});


module.exports.CommentSchema = CommentSchema;

module.exports.Comment = mongoose.model('Comment', CommentSchema);