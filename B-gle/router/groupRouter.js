const express = require('express');
const router = express.Router();

const Group = require('../model/group');
const User = require('../model/User');


router.route('/group/:group_id')
    .post(inviteGroup)
    .put(editGroup)
    .delete(removeGroup);

async function editGroup(req, res) {
    console.log(req.body.title);
    try {
        let result = await Group.changeTitle(req.params.group_id, req.body.title);
        res.send(result);
    } catch (err) {
        res.status(500).send('Fail');
    }
}
async function removeGroup(req,res){
    //Todo : IF Remove Group That Remove Bgle Related Group
    try {


        let findUser = await User.findUser(req.body.id);

        await findUser.removeGroup(req.params.group_id);

        let findGroup = await Group.findGroup(req.params.group_id);

        let resultGroup = await findGroup.removeMember(req.body.id);

        console.log(resultGroup.memberList.length);
        if(resultGroup.memberList.length === 1){
            await Group.removeGroup(req.params.group_id);
        }
        res.send(resultGroup);
    } catch (err) {
        res.status(500).send('Fail');
    }
}

async function inviteGroup(req,res) {
    try{
        let findGroup = await Group.findGroup(req.params.group_id);
        let findUser = await User.findUser(req.body.id);
        await findGroup.addMember(findUser);
        await findUser.addGroup(findGroup);
        res.send('success');
    }catch(err){
        res.status(500).send('Fail');
    }
}
module.exports = router;