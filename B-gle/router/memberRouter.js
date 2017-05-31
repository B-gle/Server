const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Image = require('../model/image');
const imageHandler = require('../handler/imageHandler');
const s3Handler = require('../handler/s3Handler');

router.route('/member')
    .post(signup)
    .put(changeInfo)
    .delete();

async function signup(req, res) {
    let result;
    // Todo: Handle Default Profile Photo
    try {
        for (let fileName in req.files) {
            let user = new User();


            let file = req.files[fileName];

            let image = new Image();

            image.setOriginPath(file.path);
            image.setThumbnailPath(file.path + '_thumb');
            image.setType(file.type);

            await imageHandler.makeThumbnail(image);
            await s3Handler.uploadImage(image);
            image = await s3Handler.uploadThumbnail(image);

            imageHandler.removeImages(image);

            result = await user.signUp(req.fields, image.getThumbURL());
            console.log(result);
            res.send('success');
        }
    } catch (err) {
        console.log(err);
        res.send('error');
    }

}
function changeInfo(req, res) {
    res.send('success');
}

module.exports = router;