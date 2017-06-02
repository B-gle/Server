const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Image = require('../model/image');
const imageHandler = require('../handler/imageHandler');
const s3Handler = require('../handler/s3Handler');


router.route('/member')
    .get(checkMember)
    .post(signUp)
    .delete(signOut);

async function checkMember(req, res) {
    res.send('success');
}
async function signUp(req, res) {
    // Todo: Handle Default Profile Photo
    try {
        let result;
        let user = new User();


        let file = req.files[0];

        let image = new Image();

        image.setOriginPath(file.path);
        image.setThumbnailPath(file.path + '_thumb');
        image.setType(file.mimetype);

        await imageHandler.makeThumbnail(image);
        await s3Handler.uploadImage(image);
        image = await s3Handler.uploadThumbnail(image);

        imageHandler.removeImages(image);

        result = await user.signUp(req.body, image.getThumbURL());
        console.log(result);
        res.send('success');

    } catch (err) {
        res.send('error');
    }

}


function signOut() {

}



module.exports = router;


