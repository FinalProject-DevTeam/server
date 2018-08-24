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
      BatchPredictionId: `${req.params.id}`,
      // MLModelId: `${req.params.id}-model`,
      MLModelId: `ml-DO70VGo3UPt`,
      OutputUri: `s3://aws-ml-tutorial-final-project-explore/`,
      BatchPredictionName: `Batch prediction: ${req.params.id}`,
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
    let filePath = `./aws/${folderName}/${req.params.id}-${dataName}.csv`

    stringify(arrData, { header: true, columns: columns }, function (err, output) {
      if (err) {
        res
          .status(400)
          .json(err)
      } else {
        fs.writeFile(filePath, output, err => {
          if (err) {
            res
              .status(400)
              .json(err)
          } else {
            fs.readFile(filePath, (err, data) => {
              let newData = new Buffer(data, 'binary');
              if (err) {
                res
                  .status(400)
                  .json(err)
              } else {
                let params = {
                  Bucket: 'aws-ml-tutorial-final-project-explore',
                  Key: `${folderName}/${req.params.id}-${dataName}.csv`,
                  Body: newData,
                }
                s3.upload(params, function (err, data) {
                  if (err) {
                    res
                      .status(400)
                      .json(err)
                  } else {
                    res
                      .status(200)
                      .json(data)
                  }
                })
              }
            })
          }
        })
      }
    });
  }

  static createDataSource(req, res) {
    let dataName = req.body.dataName;
    let folderName = req.body.folderName;
    let awsS3location = `s3://aws-ml-tutorial-final-project-explore/${folderName}/${req.params.id}-${dataName}.csv`
    let schemaPath = `../aws/schemas/${folderName}Schema.json`
    let schema = require(schemaPath);
    var computeStatisticsBool;

    if (dataName === 'transactions-data') {
      computeStatisticsBool = true;
    } else {
      computeStatisticsBool = false;
    }

    let params = {
      DataSourceId: `${req.params.id}`,
      DataSpec: {
        DataLocationS3: awsS3location,
        DataSchema: JSON.stringify(schema),
      },
      ComputeStatistics: computeStatisticsBool,
      DataSourceName: ` ${dataName}: ${req.params.id}`,
    }

    machinelearning.createDataSourceFromS3(params, function (err, data) {
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

  static deleteDataSource(req, res) {
    let params = {
      DataSourceId: req.params.id,
    }
    machinelearning.deleteDataSource(params, function (err, data) {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        res
          .status(200)
          .json(data);
      }
    })
  }
}

 module.exports = awsController;
