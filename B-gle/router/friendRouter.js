const express = require('express');
const router = express.Router();

const Member = require('../model/member');

router.route('/friend')
    .get(findFriend)
    .post(addFriend)
    .delete(removeFriend);


router.route('/friend/bookmark')
    .post(bookmarkFriend);

async function addFriend(req, res) {
    //Todo:Handle Response
    try {
        let findMember = await Member.findMember(req.body.id);
        let friendMember = await Member.findMember(req.body.friendId);
        if (findMember !== null && friendMember !== null) {
            let result = await findMember.addFriend(friendMember);
            res.send(result);
        } else {
            let error = new Error('Member not found');
            error.code = 404;
            next(error);
        }
    } catch (err) {
        let error = new Error('Error Member Add Friend function');
        error.code = 500;
        next(error);
    }
}

async function removeFriend(req, res,next) {
    //Todo:Handle Response
    try {
        let findMember = await Member.findMember(req.body.id);
        if (findMember !== null) {
            let result = await findMember.removeFriend(req.body.friendId);
            res.send(result);
        } else {
            let error = new Error('Member not found');
            error.code = 404;
            next(error);
        }
    } catch (err) {
        let error = new Error('Error Member remove function');
        error.code = 500;
        next(error);
    }
}

async function findFriend(req, res, next) {
    //Todo:Handle Response
    try {
        let findMember = await Member.findMember(req.query.id);
        if (findMember !== null) {
            res.send(findMember);
        } else {
            let error = new Error('Member not found');
            error.code = 404;
            next(error);
        }
    } catch (err) {
        let error = new Error('Error Member find function');
        error.code = 500;
        next(error);
    }
}

async function bookmarkFriend(req,res,next) {
    try {
        let findMember = await Member.findMember(req.body.id);
        if (findMember !== null) {
            await findMember.bookmarkFriend(req.body.friendId);
            res.send(findMember);
        } else {
            let error = new Error('Member not found');
            error.code = 404;
            next(error);
        }
    }catch (err) {
        let error = new Error('Error Member Bookmark function');
        error.code = 500;
        next(error);
    }
}


module.exports = router;