const mongoose = require('mongoose');
const ReplySchema = require('./reply').ReplySchema;

const BgleSchema = new mongoose.Schema({
    sender: String,
    groupId: String,
    originURL: String,
    thumbURL: String,
    like: Number,
    reply: [ReplySchema],
    message: String,
    date: {type: Date, default: Date.now}
}, {
    versionKey: false
});

BgleSchema.methods.saveBgle = function (image, info, groupId) {
    this.originURL = image.getOriginURL();
    this.thumbURL = image.getThumbURL();
    this.like = 0;
    this.message = info.message;
    this.sender = info.sender;
    this.groupId = groupId;
    return this.save();
};


const Bgle = mongoose.model('Bgle', BgleSchema, 'Bgle');

module.exports = Bgle;