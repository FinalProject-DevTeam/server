const express = require('express');
const router = express.Router();
const aws = require('../controllers/aws');

router.get('/prediction/:id', aws.getPrediction);

router.post('/prediction/:id', aws.createNewBatchPrediction);

router.delete('/prediction/:id', aws.deleteBatchPrediction);

router.post('/model', aws.trainNewModel);

router.delete('/model/:id', aws.deleteModel);

router.post('/s3', aws.uploadToS3);

router.post('/evaluation', aws.createNewEvaluation);

router.post('/evaluation/:id', aws.deleteEvaluation);

router.post('/datasource/', aws.createDataSource);

router.delete('/datasource/:id', aws.deleteDataSource);

module.exports = router;
