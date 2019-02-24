const AWS = require('aws-sdk');
const config = require('../config');

const s3 = new AWS.S3();

s3.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
});

module.exports = s3;
