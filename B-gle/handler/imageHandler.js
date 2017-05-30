const sharp = require('sharp');
const fs = require('fs');
class imageHandler {
    static makeThumbnail(image) {
        return sharp(image.getOriginPath())
            .resize(240, 320)
            .toFile(image.getThumbnailPath());
    }

    static removeImages(image) {
        fs.unlink(image.getOriginPath(), (err) => {
            if (err) throw err;
        });
        fs.unlink(image.getThumbnailPath(), (err) => {
            if (err) throw err;
        });
    }
}


module.exports = imageHandler;
