const express = require('express');
const router = express.Router();

const Member = require('../model/member');
const Image = require('../model/image');
const Bgle = require('../model/bgle');
const Group = require('../model/group');

const s3Handler = require('../handler/s3Handler');
const imageHandler = require('../handler/imageHandler');


router.route('/bgle')
    .post(createBgleInNoGroup);

router.route('/bgle/comment/:bgle_id')
    .post(createComment);

router.route('/bgle/like/:bgle_id')
    .post(likeBgle);

router.route('/bgle/:bgle_id')
    .get(getBgle)
    .put(editBgle)
    .delete(removeBgle);

router.route('/bgle/:group_id')
    .post(createBgleInGroup);


async function getBgle(req, res, next) {
    try {
        let findBgle = await Bgle.findOne({_id: req.params.bgle_id});
        if (findBgle !== null) {
            let bgleObject = findBgle.toObject();
            bgleObject.status = 'success';
            res.json(bgleObject);
        }else{
            let error = new Error('Bgle not found');
            error.code = 404;
            next(error);
        }
    } catch (err) {
        let error = new Error('Error Bgle get function');
        error.code = 500;
        next(error);
    }
}
async function createBgleInNoGroup(req, res, next) {
    try {
        for (let fileIndex in req.files) {
            let group = new Group();
            await group.setInfo('Bgle', '##FFFFFF');

            let id = req.body.sender;
            let sender = await Member.findMember(id);
            await group.addMember(sender);
            await sender.addGroup(group);

            if (!Array.isArray(req.body.receiver)) {
                let receiverid = req.body.receiver;
                let receiver = await Member.findMember(receiverid);
                await group.addMember(receiver);
                await receiver.addGroup(group);
            } else {
                for (let i = 0; i < req.body.receiver.length; i++) {
                    let id = req.body.receiver[i];
                    let receiver = await Member.findMember(id);
                    await group.addMember(receiver);
                    await receiver.addGroup(group);
                }
            }

            let bgle = new Bgle();
            let file = req.files[fileIndex];
            let image = new Image();

            image.setOriginPath(file.path);
            image.setThumbnailPath(file.path + '_thumb');
            image.setType(file.type);

            await imageHandler.makeThumbnail(image);
            await s3Handler.uploadImage(image);
            image = await s3Handler.uploadThumbnail(image);

            imageHandler.removeImages(image);
            let bgleResult = await bgle.saveBgle(image, req.body, group._id);

            /* Result */
            let object = bgleResult.toObject();
            object.status = 'success';
            res.send(object);
        }

    } catch (err) {
        let error = new Error('Error Bgle Create In No Group function');
        error.code = 500;
        next(error);
    }

}
async function createBgleInGroup(req, res, next) {
    try {
        //Todo : Check Member
        for (let fileName in req.files) {
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
            let bgleResult = await bgle.saveBgle(image, req.body, req.params.group_id);

            let object = bgleResult.toObject();
            object.status = 'success';
            res.send(object);
        }
    } catch (err) {
        let error = new Error('Error Bgle Create In Group function');
        error.code = 500;
        next(error);
    }
}
async function editBgle(req, res, next) {
    try {
        let result = await Bgle.update({_id: req.params.bgle_id}, {$set: {message: req.fields.message}});
        res.json(result);
    } catch (err) {
        let error = new Error('Error Bgle Edit function');
        error.code = 500;
        next(error);
    }
}
async function removeBgle(req, res, next) {
    try {
        let result = await Bgle.remove({_id: req.params.bgle_id});
        res.json(result);
    } catch (err) {
        let error = new Error('Error Bgle Remove function');
        error.code = 500;
        next(error);
    }
}

async function createComment(req, res, next) {
    try {
        let findBgle = await Bgle.findBgle(req.params.bgle_id);
        let comment = await findBgle.saveComment(req.body.writer, req.body.message);
        res.send(comment);
    } catch (err) {
        let error = new Error('Error Bgle Create Comment function');
        error.code = 500;
        next(error);
    }

}

async function likeBgle(req, res, next) {
    try {
        let findBgle = await Bgle.findBgle(req.params.bgle_id);
        await findBgle.likeBgle();
        res.send('success');
    } catch (err) {
        let error = new Error('Error Bgle Like function');
        error.code = 500;
        next(error);
    }
}

module.exports = router;