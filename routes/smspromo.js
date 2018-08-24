const express = require('express');
const router = express.Router();
const {SendSms} = require('../controllers/SmsPromo')

router.post('/', SendSms);

module.exports = router;
