const express = require('express');
const router = express.Router();
const aws = require('../controllers/aws');

router.get('/prediction/:id', aws.getPrediction);

router.get('/predictionstatus/:id', aws.getPredictionStatus)

router.post('/prediction/:id', aws.createNewBatchPrediction);

router.delete('/prediction/:id', aws.deleteBatchPrediction);

router.post('/model', aws.trainNewModel);

router.delete('/model/:id', aws.deleteModel);

router.get('/model/:id', aws.getModelStatus);

router.post('/s3', aws.uploadToS3);

router.post('/evaluation', aws.createNewEvaluation);

router.delete('/evaluation/:id', aws.deleteEvaluation);

router.get('evaluation/:id', aws.getEvaluationStatus)

router.post('/datasource/', aws.createDataSource);

router.delete('/datasource/:id', aws.deleteDataSource);

router.get('/datasource/:id', aws.getDataSourceStatus)

module.exports = router;
