const mongoose = require('mongoose');
const CommentSchema = require('./comment').CommentSchema;

const BgleSchema = new mongoose.Schema({
    sender: String,
    groupId: String,
    originURL: String,
    thumbURL: String,
    like: Number,
    comments: [CommentSchema],
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
BgleSchema.methods.saveComment = function (writer, message) {
    this.comments.push({writer: writer, message: message});
    return this.save();
};
BgleSchema.methods.likeBgle = function(){
    this.like = this.like + 1;
    return this.save();
};

BgleSchema.statics.findBgle = function (id) {
    return this.findOne({_id: id});
};

const Bgle = mongoose.model('Bgle', BgleSchema, 'Bgle');

module.exports = Bgle;