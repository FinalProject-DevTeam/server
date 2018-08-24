const AWS = require('aws-sdk');
const fs = require('fs');
const zlib = require('zlib');
const { stringify, parse } = require('csv');

const customersDataSchema = require('../aws/schemas/customersDataSchema.json');
const transactionsDataSchema = require('../aws/schemas/transactionsDataSchema.json');

AWS.config.loadFromPath('./awsConfig.json');

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const machinelearning = new AWS.MachineLearning({apiVersion: '2014-12-12'});

class awsController {
  static async trainNewModel(req, res) {
    console.log('trainNewModel');
  }

  static createNewBatchPrediction(req, res) {
    let params = {
      // BatchPredictionDataSourceId: `${req.params.id}-customers`,
      BatchPredictionDataSourceId: `ds-Jp5odzEcyyo`,
      BatchPredictionId: `${req.params.id}-prediction`,
      // MLModelId: `${req.params.id}-model`,
      MLModelId: `ml-DO70VGo3UPt`,
      OutputUri: `s3://aws-ml-tutorial-final-project-explore/`,
      // BatchPredictionName: `${req.body.restaurantName} Prediction`,
    }
    machinelearning.createBatchPrediction(params, function (err, data) {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        res
          .status(200)
          .json(data)
      }
    })
  }

  static getPrediction(req, res) {
    let params = {
      Bucket: 'aws-ml-tutorial-final-project-explore',
      Key: `batch-prediction/result/${req.params.id}-prediction.csv.gz`,
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

  static uploadToS3(req, res) {
    let arrData = req.body.arrData;
    let dataName = req.body.dataName;
    let folderName = req.body.folderName;
    let columns = req.body.columns;

    stringify(arrData, { header: true, columns: columns }, function (err, output) {
      if (err) {
        res
          .status(400)
          .json(err)
      } else {
        fs.writeFile(`./aws/${folderName}/${req.params.id}-${dataName}.csv`, output, err => {
          if (err) {
            res
              .status(400)
              .json(err)
          } else {
            res
              .status(200)
              .json(output)
          }
        })
      }
    });
  }
}

 module.exports = awsController;
