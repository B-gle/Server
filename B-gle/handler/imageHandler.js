const sharp = require('sharp');
const fs = require('fs');
class imageHandler {
    static makeThumbnail(image) {
        return new Promise((resolve, reject) => {
                sharp(image.getFilePath())
                    .resize(240, 320)
                    .toFile(image.getThumbnail());
                resolve();
            }
        )
    }

    static removeImages(image) {
        fs.unlink(image.getFilePath(), function (err) {
            if (err) throw err;
        });
        fs.unlink(image.getThumbnail(), function (err) {
            if (err) throw err;
        });
    }
}

module.exports = imageHandler;
