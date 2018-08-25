var admin = require('firebase-admin');
var db = admin.firestore();
const moment = require('moment');

class TransactionController {
  static addTransaction (req, res) {
    let menus = req.body.itemsOrdered;
    let menusmc = [];
    for (let i = 0; i < menus.length; i++) {
      let strmenu = '';
      for (let j = 0; j < menus[i].length; j++) {
        if(menus[i][j] === ' ') {
          strmenu += '.';
        }
        else {
          strmenu += menus[i][j];
        }
      }
      menusmc.push(strmenu)
    }

    let transactionData = {
      restaurantId: req.body.restaurantId,
      customerId: req.body.customerId,
      itemsOrdered: menus,
      itemsOrderedML: menusmc,
      createdAt: moment().format('LLL'),
      updatedAt: moment().format('LLL'),
    }

    db
      .collection('transactions')
      .add(transactionData)

    res
      .status(200)
      .json({
        msg: "Transaction successfully added",
        data: transactionData
      })
  }

  static listAllTransactions (req, res) {
    db
      .collection('transactions')
      .get()
    
    .then((snapshot) => {

      let dataAllCustomers = [];
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data())
        let objCustomer = doc.data();
        objCustomer.id = doc.id;
        dataAllCustomers.push(objCustomer)
      });
      res
        .status(200)
        .json({
          msg: "This is your customers",
          data: dataAllCustomers
        })
    })

    .catch((err) => {
      res
        .status(500)
        .json({
          msg: "Internal Server Error",
          data: `${err.message} + gagal`
        })
    });
  }


  static listTransactions (req, res) {
    db
      .collection('transactions')
      .where('restaurantId', '==', req.headers.uid)
      .get()
    
    .then((snapshot) => {
      let dataCustomers = [];
      snapshot.forEach((doc) => {
        let objCustomer = doc.data();
        objCustomer.id = doc.id;
        dataCustomers.push(objCustomer)
      });
      res
        .status(200)
        .json({
          msg: "This is your customers",
          data: dataCustomers
        })
    })

    .catch((err) => {
      res
        .status(500)
        .json({
          msg: "Internal Server Error",
          data: err.message
        })
    });
  }

  static specificTransaction (req, res) {
    db
      .collection('transactions')
      .doc(req.params.id)
      .get()

      .then((result) => {
        let dataTransaction = result.data()
        dataTransaction.id = result.id

        res
        .status(200)
        .json({
          msg: "This is your customer",
          data: dataTransaction
        })
      })

      .catch(err => {
        res
        .status(500)
        .json({
          msg: "Internal Server Error",
          data: err.message
        })
      });
  }

  static updateTransaction (req, res) {
    let menus = req.body.itemsOrdered;
    let menusmc = [];
    for (let i = 0; i < menus.length; i++) {
      let strmenu = '';
      for (let j = 0; j < menus[i].length; j++) {
        if(menus[i][j] === ' ') {
          strmenu += '.';
        }
        else {
          strmenu += menus[i][j];
        }
      }
      menusmc.push(strmenu)
    }

    let transactionData = {
      restaurantId: req.body.restaurantId,
      customerId: req.body.customerId,
      itemsOrdered: menus,
      itemsOrderedML: menusmc,
      createdAt: req.body.createdAt,
      updatedAt: moment().format('LLL'),
    }

    db
      .collection('transactions')
      .doc(req.params.id)
      .update(transactionData)

    .then(result => {
      res
        .status(200)
        .json({
          msg: "Data successfully updated",
          data: transactionData,
        })
    })

    .catch(err => {
      res
        .status(500)
        .json({
          msg: "Internal Server Error",
          data: err.message,
        })
    })
  }

  static deleteTransaction (req, res) {
    db
    .collection('transactions')
    .doc(req.params.id)
    .delete()

    .then(() => {
      res
        .status(200)
        .json({
          msg: `data with id : ${req.params.id} successfully deleted`,
          data: req.params.id
        })
    })
    
    .catch( err => {
      res
        .status(500)
        .json({
          msg: "Internal server error",
          data: err.message
        })
    });
  }
}

module.exports = TransactionController;