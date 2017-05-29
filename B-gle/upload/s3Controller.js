const s3Config = require('../config/s3Config');
const AWS = require('aws-sdk');
const fs = require('fs');


AWS.config.update({
    secretAccessKey: s3Config.secretAccessKey,
    accessKeyId: s3Config.accessKeyId,
    region: s3Config.region
});

const s3 = new AWS.S3();

class s3Controller {
    static upload(file) {

        const params = {
            Bucket: s3Config.bucket,  // 필수
            Key: file.path,			// 필수
            ACL: 'public-read',
            Body: fs.createReadStream(file.path),
            ContentType: file.type
        };
        return new Promise(function (resolve, reject) {
            s3.putObject(params, (err, data) => {
                if(err){
                    reject(err);
                }
                resolve(data);
            });
        });
    }

}

module.exports = s3Controller;
