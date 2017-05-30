const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    originURL: String,
    thumbURL: String,
    like: Number,
    Date:{ type:Date, default:Date.now }
}, {
    versionKey: false
});

PostSchema.methods.saveImage = function (image) {
    this.originURL = image.getOriginURL();
    this.thumbURL = image.getThumbURL();
    this.like = 0;
    return this.save();
};

const Post = mongoose.model('Post', PostSchema, 'Post');

module.exports = Post;