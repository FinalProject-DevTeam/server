const express = require('express');
const router = express.Router();
const aws = require('../controllers/aws');

router.get('/prediction/:id', aws.getPrediction);

router.post('/prediction/:id', aws.createNewBatchPrediction);

router.post('/model/:id', aws.trainNewModel);

router.post('/s3/:id', aws.uploadToS3);

router.post('/datasource/:id', aws.createDataSource);

router.delete('/datasource/:id', aws.deleteDataSource);

module.exports = router;
