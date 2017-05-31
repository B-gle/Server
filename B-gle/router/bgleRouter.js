const express = require('express');
const router = express.Router();

const User = require('../model/user');
const Image = require('../model/image');
const Bgle = require('../model/bgle');
const Group = require('../model/group');

const s3Handler = require('../handler/s3Handler');
const imageHandler = require('../handler/imageHandler');


router.route('/bgle')
    .post(createBgleNoGroup);
router.route('/bgle/:bgle_id')
    .get(getBgle)
    .put(editBgle)
    .delete(removeBgle);
router.route('/bgle/:group_id')
    .post(createBgleGroup);

async function getBgle(req, res) {
    try {
        //Todo : Refactor Code
        let result = await Bgle.findOne({_id: req.params.bgle_id});
        let result2 = result.toObject();
        result2.status = 'success';
        res.json(result2);
    } catch (err) {
        res.status(500).send('Error Find Post!');
    }
}
async function createBgleNoGroup(req, res) {
    try {
        // Todo: Check File, Check Group Num, Refactor Code, 사람일 경우, 그룹일 경우
        for (let fileName in req.files) {

            let group = new Group();
            let groupResult = await group.setInfo('NO Group Test', '##FFFFFF');

            //그룹이 없는 경우에 사진을 보내면 그룹이 만들어지고 각 유저마다 그룹정보를 들고있는다 또한 그룹도 유저정보를 들고있는다.
            /* Handle Sender */
            let id = req.fields.sender;
            let sender = await User.findUser(id);
            await group.addMember({id: id, profile: sender.profile});

            /* Handle Receiver */

            /* Handle User Group */
            sender.addGroup(group._id);


            /* Make Bgle*/
            let bgle = new Bgle();
            let file = req.files[fileName];
            let image = new Image();

            image.setOriginPath(file.path);
            image.setThumbnailPath(file.path + '_thumb');
            image.setType(file.type);

            await imageHandler.makeThumbnail(image);
            await s3Handler.uploadImage(image);
            image = await s3Handler.uploadThumbnail(image);

            imageHandler.removeImages(image);
            let bgleResult = await bgle.saveBgle(image, req.fields);

            /* Result */
            let object = bgleResult.toObject();
            object.groupID = groupResult._id;
            object.status = 'success';
            res.send(object);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Error Create Post');
    }

}
async function createBgleGroup(req, res) {
    try {
        // Todo: Check File, Check Group Num, Refactor Code, 사람일 경우, 그룹일 경우, 멤버인지 아닌지 확인
        for (let fileName in req.files) {
            // 그룹 있을 경우

            let groupResult = await Group.findGroup(req.params.group_id);


            /* Make Bgle*/
            let bgle = new Bgle();
            let file = req.files[fileName];
            let image = new Image();

            image.setOriginPath(file.path);
            image.setThumbnailPath(file.path + '_thumb');
            image.setType(file.type);

            await imageHandler.makeThumbnail(image);
            await s3Handler.uploadImage(image);
            image = await s3Handler.uploadThumbnail(image);

            imageHandler.removeImages(image);
            let bgleResult = await bgle.saveBgle(image, req.fields);

            /* Result */
            let object = bgleResult.toObject();
            object.groupID = groupResult._id;
            object.status = 'success';
            res.send(object);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Error Create Post');
    }
}
async function editBgle(req, res) {
    try {
        let result = await Bgle.update({_id: req.params.bgle_id}, {$set: {message: req.fields.message}});
        res.json(result);
    } catch (err) {
        res.status(500).send('Error Find Post!');
    }
}
async function removeBgle(req, res) {
    try {
        let result = await Bgle.remove({_id: req.params.bgle_id});
        res.json(result);
    } catch (err) {
        res.status(500).send('Error Find Post!');
    }
}

module.exports = router;