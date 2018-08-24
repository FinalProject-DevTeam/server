const express = require('express');
const router = express.Router();
const aws = require('../controllers/aws');

router.get('/prediction/:id', aws.getPrediction);

router.post('/prediction/:id', aws.createNewBatchPrediction);

router.post('/model/:id', aws.trainNewModel);

router.post('/s3/:id', aws.uploadToS3);

module.exports = router;
