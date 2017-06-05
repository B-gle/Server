const express = require('express');
const router = express.Router();
const Member = require('../model/member');
const Image = require('../model/image');
const imageHandler = require('../handler/imageHandler');
const s3Handler = require('../handler/s3Handler');


router.route('/member')
    .get(checkMember)
    .post(signUp)
    .delete(signOut);
router.route('/member/login')
    .post(loginMember);
router.route('/member/logout')
    .post(logoutMember);

async function checkMember(req,res,next) {
    res.send('success');
}
async function signUp(req,res,next) {
    // Todo: Handle Default Profile Photo
    try {
        let result;
        let member = new Member();


        let file = req.files[0];

        let image = new Image();

        image.setOriginPath(file.path);
        image.setThumbnailPath(file.path + '_thumb');
        image.setType(file.mimetype);

        await imageHandler.makeThumbnail(image);
        await s3Handler.uploadImage(image);
        image = await s3Handler.uploadThumbnail(image);

        imageHandler.removeImages(image);

        result = await member.signUp(req.body, image.getThumbURL());
        console.log(result);
        res.send('success');

    } catch (err) {
        res.status(500).send('Error Create Post');
    }

}


async function loginMember(req, res, next) {
    try {
        let findMember = await Member.findMember(req.body.id);
        if (findMember !== null) {
            if(findMember.isPassword(req.body.password)){
                res.send('success');
            }else{
                let error = new Error('Password Wrong');
                error.code = 401;
                next(error);
            }
        }
        else {
            let error = new Error('Member not Found');
            error.code = 404;
            next(error);
        }
    }
    catch (err) {
        let error = new Error('Error Member login function');
        error.code = 500;
        next(error);
    }
}

function signOut() {

}

function logoutMember() {

}


module.exports = router;


