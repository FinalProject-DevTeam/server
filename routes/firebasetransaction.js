const express = require('express');
const router = express.Router();
const firebaseTransaction = require('../controllers/firebaseTransaction');

router.post('/', firebaseTransaction.addTransaction);
router.get('/', firebaseTransaction.listTransactions);
router.get('/alltransactions', firebaseTransaction.listAllTransactions);
router.get('/:id', firebaseTransaction.specificTransaction)
router.put('/:id', firebaseTransaction.updateTransaction)
router.delete('/:id', firebaseTransaction.deleteTransaction)

module.exports = router;
