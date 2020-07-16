const fs = require('fs');
const AWS = require('aws-sdk');

const ID = process.env.AWSAccessKeyId;
const SECRET = process.env.AWSSecretKey;

const BUCKET_NAME = 'mrskai';

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const uploadFile = (fileName, origName) => {
  const fileContent = fs.readFileSync(fileName);
  const params = {
    Bucket: BUCKET_NAME,
    Key: origName,
    Body: fileContent,
    ACL: 'public-read-write',
    'x-amz-acl': 'public-read'
  };

  s3.upload(params, (err, data) => {});

  return `https://mrskai.s3.amazonaws.com/${origName}`;
};

module.exports = { uploadFile };
