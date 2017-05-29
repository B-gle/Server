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
            Key: image.getFilePath(),
            ACL: 'public-read',
            Body: fs.createReadStream(image.getFilePath()),
            ContentType: image.getType()
        };
        image.setURL(s3.endpoint.href + s3Config.bucket + '/' + image.getFilePath());
        return new Promise((resolve, reject) => {
            s3.putObject(params, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(image);
            });
        });
    }

    static uploadThumbnail(image) {
        const params = {
            Bucket: s3Config.bucket,
            Key: image.getThumbnail(),
            ACL: 'public-read',
            Body: fs.createReadStream(image.getThumbnail()),
            ContentType: image.getType()
        };
        return new Promise((resolve, reject) => {
            s3.putObject(params, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(image);
            });
        });
    }

}

module.exports = s3Handler;
