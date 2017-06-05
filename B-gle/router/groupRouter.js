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

async function editGroup(req, res, next) {
    try {
        let findGroup = await Group.findGroup(req.params.group_id);

        if (findGroup !== null) {
            let checkMember = findGroup.findMember(req.body.id);
            if (checkMember !== null) {
                let result = await findGroup.changeTitle(req.body.title);
                res.send(result);
            }else{
                let error = new Error('No Member found In Group ');
                error.code = 404;
                next(error);
            }
        } else {
            let error = new Error('Group Not found');
            error.code = 404;
            next(error);
        }
    } catch (err) {
        let error = new Error('Error Group Edit function');
        error.code = 500;
        next(error);
    }
}
async function removeGroup(req, res, next) {
    //Todo : IF Remove Group That Remove Bgle Related Group
    try {
        let findMember = await Member.findMember(req.body.id);

        await findMember.removeGroup(req.params.group_id);

        let findGroup = await Group.findGroup(req.params.group_id);

        let resultGroup = await findGroup.removeMember(req.body.id);

        console.log(resultGroup.memberList.length);
        if (resultGroup.memberList.length === 1) {
            await Group.removeGroup(req.params.group_id);
        }
        res.send(resultGroup);
    } catch (err) {
        let error = new Error('Error Group remove function');
        error.code = 500;
        next(error);
    }
}

async function inviteGroup(req, res, next) {
    try {
        let findGroup = await Group.findGroup(req.params.group_id);
        let findMember = await Member.findMember(req.body.id);
        await findGroup.addMember(findMember);
        await findMember.addGroup(findGroup);
        res.send('success');
    } catch (err) {
        let error = new Error('Error Group invite function');
        error.code = 500;
        next(error);
    }
}

async function bookmarkGroup(req, res, next) {
    try {
        let findMember = await Member.findMember(req.body.id);
        await findMember.bookmarkGroup(req.body.groupId);
        res.send(findMember);
    } catch (err) {
        let error = new Error('Error Group bookmark function');
        error.code = 500;
        next(error);
    }
}

module.exports = router;