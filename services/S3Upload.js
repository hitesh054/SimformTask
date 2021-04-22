const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config()
const s3 = new AWS.S3();
const uploadFile =
    (fileName, bucketName) => {
        console.log("filename \n", fileName);
        // Read content from the file
        const fileContent = fs.readFileSync(`./uploads/${fileName}`);

        // Setting up S3 upload parameters
        const params = {
            Bucket: bucketName,
            Key: fileName, // File name you want to save as in S3
            Body: fileContent
        };
        return new Promise((resolve, reject) => {
            // Uploading files to the bucket
            s3.upload(params, function (err, data) {
                if (err) {
                    console.log("err    \n", err);
                    reject(false)
                }
                if (data) {
                    console.log("data    \n", data);
                    resolve(true);
                }
            });
        });
    }
exports.uploadFile = uploadFile;