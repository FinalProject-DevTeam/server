const AWS = require('aws-sdk');
const fs = require('fs');

const customersDataSchema = require('../aws/schemas/customersDataSchema.json');
const transactionsDataSchema = require('../aws/schemas/transactionsDataSchema.json');

AWS.config.loadFromPath('./awsConfig.json');

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const machinelearning = new AWS.MachineLearning({apiVersion: '2014-12-12'});

class awsController {
  static async trainNewModel(req, res) {
    console.log('trainNewModel');
  }

  static async createNewBatchPrediction(req, res) {
    console.log('createNewBatchPrediction');
  }

  static async getPrediction(req, res) {
    console.log('getPrediction');
  }
}

 module.exports = awsController;
