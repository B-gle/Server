const express = require('express');
const post = require('../model/post');
const s3Controller = require('../upload/s3Controller');
const router = express.Router();


router.route('/b-gle')
    .get(getB_gle)
    .post(createB_gle)
    .put(editB_gle)
    .delete(removeB_gle);

function getB_gle(req, res) {
    res.send('Hello');
}
async function createB_gle(req, res) {
    try {
        for (let fileName in req.files) {
            if (Array.isArray(req.files[fileName])) {
                for (let fileIndex in req.files[fileName]) {
                    await s3Controller.upload(req.files[fileName][fileIndex]);
                }
            }else{
                await s3Controller.upload(req.files[fileName]);
            }
        }
        res.send('Success Image');
    } catch (error) {
        console.log('Task Failure', error);
        res.status(500).send('Something broke!');
    }

}
function editB_gle(req, res) {
    res.send('Hello');
}
function removeB_gle(req, res) {
    res.send('Hello');
}


module.exports = router;