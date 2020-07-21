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
  const uuid = new Date().getTime();
  const name = `${uuid}` + origName;
  const params = {
    Bucket: BUCKET_NAME,
    Key: name,
    Body: fileContent,
    ACL: 'public-read-write',
  };

  s3.putObject(params, (err, data) => {
    console.log('upload err', err);
    console.log('upload data', data);
  });

  return `https://${BUCKET_NAME}.s3.amazonaws.com/${name}`;
};

const deleteFile = (fileName) => {
  console.log('file name', fileName);
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
  }

  s3.deleteObject(params, (err, data) => {
    console.log('delete err', err);
    console.log('delete data', data);
  })
}

module.exports = { uploadFile, deleteFile };
