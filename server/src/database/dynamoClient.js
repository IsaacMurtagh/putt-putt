'use strict';

const AWS = require('aws-sdk');

const config = {
	region: 'ap-southeast-2',
  endpoint: 'http://dynamo:8000',
  accessKeyId: 'STYX',
  secretAccessKey: 'SECRET',
};

const client = new AWS.DynamoDB.DocumentClient(config);

module.exports = client;