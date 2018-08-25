const AWS = require('aws-sdk');
const fs = require('fs');
const zlib = require('zlib');
const { stringify, parse } = require('csv');

const customersDataSchema = require('../aws/schemas/customersDataSchema.json');
const transactionsDataSchema = require('../aws/schemas/transactionsDataSchema.json');

const date = new Date();
const today = `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;

// console.log(today);

AWS.config.loadFromPath('./awsConfig.json');

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const machinelearning = new AWS.MachineLearning({apiVersion: '2014-12-12'});

class awsController {
  static trainNewModel(req, res) {
    let params = {
      MLModelId: `${today}-model`,
      MLModelType: `MULTICLASS`,
      // TrainingDataSourceId: 'ds-OQa4pocoDQH',
      TrainingDataSourceId: `${today}-datasource`,
      MLModelName: `Model: ${today}`,
    }

    machinelearning.createMLModel(params, function (err, data) {
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

  static deleteModel(req, res) {
    let params = {
      MLModelId: `${req.params.id}-model`
    }

    machinelearning.deleteMLModel(params, function (err, data) {
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

  static getModelStatus(req, res) {
    let params = {
      MLModelId: `${req.params.id}-model`
    }

    machinelearning.getMLModel(params, function (err, data) {
      if (err) {
        res
          .status(400)
          .json(err)
      } else {
        res
          .status(200)
          .json(data.Status)
      }
    });
  }

  static createNewEvaluation(req, res) {
    let params = {
      EvaluationDataSourceId: `${today}-datasource`,
      EvaluationId:`${today}-evaluation`,
      MLModelId: `${today}-model`,
      EvaluationName: `Evaluation: ${today}`
    }

    machinelearning.createEvaluation(params, function (err, data) {
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

  static deleteEvaluation(req, res) {
    let params = {
      EvaluationId:`${req.params.id}-evaluation`,
    }

    machinelearning.deleteEvaluation(params, function (err, data) {
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

  static getEvaluationStatus(req, res) {
    let params = {
      EvaluationId:`${req.params.id}-evaluation`,
    }

    machinelearning.getEvaluation(params, function (err, data) {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        res
          .status(200)
          .json(data.Status);
      }
    })
  }

  static createNewBatchPrediction(req, res) {
    let params = {
      BatchPredictionDataSourceId: `${req.params.id}-${today}-datasource`,
      BatchPredictionId: `${req.params.id}-${today}-prediction`,
      MLModelId: `${today}-model`,
      OutputUri: `s3://aws-ml-tutorial-final-project-explore/`,
      BatchPredictionName: `Batch prediction: ${req.params.id} ${today}`,
    }
    // console.log(params);
    machinelearning.createBatchPrediction(params, function (err, data) {
      if (err) {
        console.log(err);
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
      Key: `batch-prediction/result/${req.params.id}-${today}-prediction.csv.gz`,
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
                for (let j = 0; j < currentRow.length; j++) {
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

  static deleteBatchPrediction(req, res) {
    let params = {
      BatchPredictionId: `${req.params.id}-${today}-prediction`,
    }

    machinelearning.deleteBatchPrediction(params, function (err, data) {
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

  static getPredictionStatus(req, res) {
    let params = {
      BatchPredictionId: `${req.params.id}-${today}-prediction`,
    }

    machinelearning.getBatchPrediction(params, function (err, data) {
      if (err) {
        res
          .status(400)
          .json(err)
      } else {
        res
          .status(200)
          .json(data.Status);
      }
    })
  }

  static uploadToS3(req, res) {
    let arrData = req.body.arrData;
    let dataName = req.body.dataName;
    let folderName = req.body.folderName;
    let columns = req.body.columns;
    let id = req.body.id
    let filePath;

    if (dataName === 'transactions-data') {
      filePath = `./aws/${folderName}/${today}-${dataName}.csv`
    } else {
      filePath = `./aws/${folderName}/${id}-${today}-${dataName}.csv`
    }

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
                let params;

                if (dataName === 'transactions-data') {
                  params = {
                    Bucket: 'aws-ml-tutorial-final-project-explore',
                    Key: `${folderName}/${today}-${dataName}.csv`,
                    Body: newData,
                  }
                } else {
                  params = {
                    Bucket: 'aws-ml-tutorial-final-project-explore',
                    Key: `${folderName}/${id}-${today}-${dataName}.csv`,
                    Body: newData,
                  }
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
    let id = req.body.id;
    let schemaPath = `../aws/schemas/${folderName}Schema.json`
    let schema = require(schemaPath);
    let computeStatisticsBool;
    let params;
    let awsS3location;

    if (dataName === 'transactions-data') {
      awsS3location = `s3://aws-ml-tutorial-final-project-explore/${folderName}/${today}-${dataName}.csv`
      computeStatisticsBool = true;
      params = {
        DataSourceId: `${today}-datasource`,
        DataSpec: {
          DataLocationS3: awsS3location,
          DataSchema: JSON.stringify(schema),
        },
        ComputeStatistics: computeStatisticsBool,
        DataSourceName: `${dataName}: ${today}`,
      }
    } else {
      computeStatisticsBool = false;
      awsS3location = `s3://aws-ml-tutorial-final-project-explore/${folderName}/${id}-${today}-${dataName}.csv`
      params = {
        DataSourceId: `${id}-${today}-datasource`,
        DataSpec: {
          DataLocationS3: awsS3location,
          DataSchema: JSON.stringify(schema),
        },
        ComputeStatistics: computeStatisticsBool,
        DataSourceName: ` ${dataName}: ${req.body.id}-${today}`,
      }
    }

    machinelearning.createDataSourceFromS3(params, function (err, data) {
      if (err) {
        console.log(err);
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
      DataSourceId: `${req.params.id}-${today}-datasource`,
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

  static getDataSourceStatus(req, res) {
    let params = {
      DataSourceId: `${req.params.id}-datasource`
    }

    machinelearning.getDataSource(params, function (err, data) {
      if (err) {
        res
          .status(400)
          .json(err)
      } else {
        res
          .status(200)
          .json(data.Status)
      }
    });
  }

}

 module.exports = awsController;
