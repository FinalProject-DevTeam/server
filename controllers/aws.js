const AWS = require('aws-sdk');
const fs = require('fs');
const zlib = require('zlib');
const csv = require('csv');
let parse = csv.parse;

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
    let params = {
      Bucket: 'aws-ml-tutorial-final-project-explore',
      Key: 'batch-prediction/result/bp-5NhckrSnBw0-customers.csv.gz'
    }
    s3.getObject(params, function (err, data) {
      if (err) {
        res
          .status(400)
          .json(err);
        console.log(err);
      } else {
        zlib.unzip(data.Body, (err, buffer) => {
          if (!err) {
            let csvString = buffer.toString();
            parse(csvString, function(err, output) {
              let processedArr = [output[0]]
              for (let i = 1; i < output.length; i++) {
                let processedRow = [];
                let currentRow = output[i];
                for (var j = 0; j < currentRow.length; j++) {
                  let processedDatum = Number(currentRow[j].slice(0, 1));
                  processedRow.push(processedDatum);
                }
                processedArr.push(processedRow);
              }
              res
                .status(200)
                .json(processedArr);
            });
          } else {
            res
              .status(400)
              .json(err);
          }
        })
      }
    });
  }
}

 module.exports = awsController;
