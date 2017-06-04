const express = require('express');
const router = express.Router();

const Group = require('../model/group');
const Member = require('../model/member');



router.route('/group/bookmark')
    .post(bookmarkGroup);

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


        let findMember = await Member.findMember(req.body.id);

        await findMember.removeGroup(req.params.group_id);

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
        let findMember = await Member.findMember(req.body.id);
        await findGroup.addMember(findMember);
        await findMember.addGroup(findGroup);
        res.send('success');
    }catch(err){
        res.status(500).send('Fail');
    }
}

async function bookmarkGroup(req,res) {
    try {
        let findMember = await Member.findMember(req.body.id);
        await findMember.bookmarkGroup(req.body.groupId);
        res.send(findMember);
    } catch (err) {
        console.log(err);
        res.status(500).send('error');
    }
}

module.exports = router;