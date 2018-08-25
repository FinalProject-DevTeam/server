const express = require('express');
const router = express.Router();
const customerPopulate = require('../controllers/customerPopulate');

router.get('/', customerPopulate.getAllPopulate)

module.exports = router