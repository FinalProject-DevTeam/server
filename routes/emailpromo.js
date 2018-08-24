const express = require('express');
const router = express.Router();
const {sendEmail} = require('../controllers/EmailPromo')

router.post('/', sendEmail);

module.exports = router;
