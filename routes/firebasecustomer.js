const express = require('express');
const router = express.Router();
const firebaseCustomer = require('../controllers/firebaseCustomer');
const firebaseAuthentication = require('../controllers/firebaseAuthentication');

/*
Customers
*/
router.post('/', firebaseCustomer.addCustomer);
router.get('/', firebaseCustomer.listCustomer);
router.get('/:id', firebaseCustomer.specificCustomer)
router.put('/:id', firebaseCustomer.updateCustomer);
router.delete('/:id', firebaseCustomer.deleteCustomer);

module.exports = router;
