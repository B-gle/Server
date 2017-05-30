const express = require('express');
const Image = require('../model/image');
const s3Handler = require('../handler/s3Handler');
const imageHandler = require('../handler/imageHandler');
const Post = require('../model/post');
const router = express.Router();


router.route('/post')
    .post(createPost);
router.route('/post/:id')
    .get(getPost)
    .put(editPost)
    .delete(removePost);

async function getPost(req, res) {
    try {
        let result = await Post.findOne({_id: req.params.id});
        res.json(result);
    }catch(err){
        res.status(500).send('Error Find Post!');
    }
}
async function createPost(req, res) {
    try {
        for (let fileName in req.files) {

            let result;
            let post = new Post();
            let file = req.files[fileName];
            let image = new Image();

            image.setOriginPath(file.path);
            image.setThumbnailPath(file.path + '_thumb');
            image.setType(file.type);

            await imageHandler.makeThumbnail(image);
            await s3Handler.uploadImage(image);
            image = await s3Handler.uploadThumbnail(image);

            imageHandler.removeImages(image);
            result = await post.savePost(image,req.fields.message);


            res.json(result);
        }
    } catch (error) {
        res.status(500).send('Error Create Post');
    }

}
async function editPost(req, res) {
    try {
        let result = await Post.update({_id: req.params.id},{$set:{message:req.fields.message}});
        res.json(result);
    }catch(err){
        res.status(500).send('Error Find Post!');
    }
}
async function removePost(req, res) {
    try {
        let result = await Post.remove({_id: req.params.id});
        res.json(result);
    }catch(err){
        res.status(500).send('Error Find Post!');
    }
}

module.exports = router;