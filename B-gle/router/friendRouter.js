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
    try {
        let findMember = await Member.findMember(req.body.id);
        let friendMember = await Member.findMember(req.body.friendId);
        let result = await findMember.addFriend(friendMember);

        res.send(result);
    } catch (err) {
        res.status(500).send('error');
    }
}
async function removeFriend(req, res) {
    try {
        let findMember = await Member.findMember(req.body.id);
        let result = await findMember.removeFriend(req.body.friendId);
        res.send(result);
    } catch (err) {
        res.status(500).send('error');
    }
}

async function findFriend(req, res) {
    try {
        let findMember = await Member.findMember(req.query.id);
        res.send(findMember);
    } catch (err) {
        res.status(500).send('error');
    }
}

async function bookmarkFriend(req,res) {
    try {
        let findMember = await Member.findMember(req.body.id);
        await findMember.bookmarkFriend(req.body.friendId);
        res.send(findMember);
    } catch (err) {
        console.log(err);
        res.status(500).send('error');
    }
}


module.exports = router;