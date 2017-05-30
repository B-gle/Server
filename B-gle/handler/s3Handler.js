const s3Config = require('../config/s3Config');
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
    secretAccessKey: s3Config.secretAccessKey,
    accessKeyId: s3Config.accessKeyId,
    region: s3Config.region
});

const s3 = new AWS.S3();

class s3Handler {
    static uploadImage(image) {
        const params = {
            Bucket: s3Config.bucket,
            Key: image.getOriginPath(),
            ACL: 'public-read',
            Body: fs.createReadStream(image.getOriginPath()),
            ContentType: image.getType()
        };
        image.setOriginURL(s3.endpoint.href + s3Config.bucket + '/' + image.getOriginPath());
        return new Promise((resolve, reject) => {
            s3.putObject(params, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(image);
            });
        });
    }

    static uploadThumbnail(image) {
        const params = {
            Bucket: s3Config.bucket,
            Key: image.getThumbnailPath(),
            ACL: 'public-read',
            Body: fs.createReadStream(image.getThumbnailPath()),
            ContentType: image.getType()
        };
        image.setThumbURL(s3.endpoint.href + s3Config.bucket + '/' + image.getThumbnailPath());
        return new Promise((resolve, reject) => {
            s3.putObject(params, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(image);
            });
        });
    }
}

module.exports = s3Handler;
