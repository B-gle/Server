const express = require('express');
const Image = require('../model/image');
const s3Handler = require('../handler/s3Handler');
const imageHandler = require('../handler/imageHandler');
const Post = require('../model/post');
const router = express.Router();


router.route('/b-gle')
    .post(createB_gle);

router.route('/b-gle/:ID')
    .get(getB_gle)
    .put(editB_gle)
    .delete(removeB_gle);

function getB_gle(req, res) {
    Post.findOne({_id: req.params.ID}, (err, memo) => {
        if (err) {
            console.log('Hello Error');
            return;
        }
        res.json(memo);
    });
}
async function createB_gle(req, res) {
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
            result = await post.saveImage(image);

            res.json(result);
        }
    } catch (error) {
        res.status(500).send('Something broke!');
    }

}
function editB_gle(req, res) {
    res.send('Hello');
}
function removeB_gle(req, res) {
    res.send('Hello');
}


module.exports = router;