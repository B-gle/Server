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

async function checkMember(req, res) {
    res.send('success');
}
async function signUp(req, res) {
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
function signOut() {

}

async function loginMember(req,res){
    try{

        let findMember = await Member.findMember(req.body.id);
        let result = findMember.isPassword(req.body.password);
        if(result){
            res.send('Success');
        }
        else{
            res.status(500).send('Error Create Post');
        }
    }catch(err){
        res.status(500).send('Error Create Post');
    }
}

function logoutMember() {

}


module.exports = router;


