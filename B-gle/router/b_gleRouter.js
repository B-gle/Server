const express = require('express');
const Image = require('../model/image');
const s3Handler = require('../handler/s3Handler');
const imageHandler = require('../handler/imageHandler');
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
            let file;
            if (Array.isArray(req.files[fileName])) {
                for (let fileIndex in req.files[fileName]) {
                    file = req.files[fileName][fileIndex];
                    let image = await handleB_gle(file);

                }
            }else{
                file = req.files[fileName];
                let image = await handleB_gle(file);

            }

        }
        res.send('Success Image');
    } catch (error) {
        res.status(500).send('Something broke!');
    }

}
function editB_gle(req, res) {
    res.send('Hello');
}
function removeB_gle(req, res) {
    res.send('Hello');
}

async function handleB_gle(file){
    let image = new Image();
    image.setFilePath(file.path);
    image.setThumbnail(file.path+'_thumb');
    image.setType(file.type);

    await imageHandler.makeThumbnail(image);
    image = await s3Handler.uploadImage(image);
    await s3Handler.uploadThumbnail(image);

    imageHandler.removeImages(image);
    return image;
}

module.exports = router;