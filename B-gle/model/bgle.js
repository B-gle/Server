const mongoose = require('mongoose');
const ReplyScheme = require('./reply').ReplyScheme;

const BgleScheme = new mongoose.Schema({
    originURL: String,
    thumbURL: String,
    like: Number,
    replyCnt: Number,
    reply: [ReplyScheme],
    message: String,
    sender: String,
    receiveGroup: String,
    date:{ type:Date, default:Date.now }
}, {
    versionKey: false
});

BgleScheme.methods.saveBgle = function (image, info) {
    this.originURL = image.getOriginURL();
    this.thumbURL = image.getThumbURL();
    this.like = 0;
    this.message = info.message;
    this.sender = info.sender;
    return this.save();
};


const Bgle = mongoose.model('Bgle', BgleScheme, 'Bgle');

module.exports = Bgle;