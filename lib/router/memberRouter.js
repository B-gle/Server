const express = require('express');
const router = express.Router();

router.route('/member')
    .post(signup)
    .put()
    .delete();

function signup(req,res){
    res.send('success');
}

module.exports = router;