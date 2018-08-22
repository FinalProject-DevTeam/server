const express = require('express');
const router = express.Router();
const firebaseAuthentication = require('../controllers/firebaseAuthentication');

/*
Authentication
*/
router.get('/', firebaseAuthentication.getOwners)

module.exports = router