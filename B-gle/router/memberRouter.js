const express = require('express');
const router = express.Router();

router.route('/member')
    .post(signup)
    .put(changeInfo)
    .delete();

function signup(req,res){
    res.send('success');
}
function changeInfo(req,res){
    res.send('success');
}

module.exports = router;