const express = require('express');
const router = express.Router();
const firebaseCustomer = require('../controllers/firebaseCustomer');

/*
Customers
*/
router.post('/', firebaseCustomer.addCustomer);
router.get('/', firebaseCustomer.listCustomer);
router.get('/listbydate', firebaseCustomer.listCustomerByDate);
router.get('/email/:food', firebaseCustomer.getDataEmailByFood);
router.get('/sms/:food', firebaseCustomer.getDataPhoneNumber);
router.get('/:id', firebaseCustomer.specificCustomer);
router.put('/:id', firebaseCustomer.updateCustomer);
router.post('/setdata/:id', firebaseCustomer.setNewCustomer);
router.delete('/:id', firebaseCustomer.deleteCustomer);

module.exports = router;
