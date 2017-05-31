const express = require('express');
const router = express.Router();

const Group = require('../model/group');

router.route('/group/:group_id')
    .put(editGroup);

async function editGroup(req, res) {
    try {
        let result = await Group.changeTitle(req.params.group_id, req.fields.title);
        res.json(result);
    } catch (err) {
        res.status(500).send('ERROR');
    }
}

module.exports = router;