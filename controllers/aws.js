const AWS = require('aws-sdk');
const fs = require('fs');

const awsConfig = require('../awsConfig.json');
const customersDataSchema = require('../aws/schemas/customersDataSchema.json');
const transactionsDataSchema.json = require('../aws/schemas/transactionsDataSchema.json');

AWS.config.loadFromPath(awsConfig);

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const machinelearning = new AWS.MachineLearning({apiVersion: '2014-12-12'});

class awsController {
  static async trainNewModel(req, res) {
    console.log('trainNewModel');
  }

  static async createNewBathPrediction(req, res) {
    console.log('createNewBathPrediction');
  }
}

 module.exports = awsController;
