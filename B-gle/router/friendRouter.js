const express = require('express');
const router = express.Router();

const User = require('../model/user');

router.route('/friend')
    .post(addFriend)
    .delete(removeFriend);

async function addFriend(req, res) {
    try {
        let findUser = await User.findUser(req.body.id);
        let friendUser = await User.findUser(req.body.friendId);
        let result = await findUser.addFriend(friendUser);

        res.send(result);
    } catch (err) {
        res.status(500).send('error');
    }
}
async function removeFriend(req, res) {
    try{
        let findUser = await User.findUser(req.body.id);
        let result = await findUser.removeFriend(req.body.friendId);

        res.send(result);
    }catch(err){
        res.status(500).send('error');
    }
}


module.exports = router;