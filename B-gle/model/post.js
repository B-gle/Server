const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    originURL: String,
    thumbURL: String,
    like: Number,
    message: String,
    Date:{ type:Date, default:Date.now }
}, {
    versionKey: false
});

PostSchema.methods.savePost = function (image,message) {
    this.originURL = image.getOriginURL();
    this.thumbURL = image.getThumbURL();
    this.like = 0;
    this.message = message;
    return this.save();
};


const Post = mongoose.model('Post', PostSchema, 'Post');

module.exports = Post;