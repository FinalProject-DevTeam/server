var admin = require('firebase-admin');
var serviceAccount = require('../keyfile.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASEURL
});

var db = admin.firestore()
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

class CustomerController {
  static addCustomer (req, res) {
    let customerData = {
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      birthYear: req.body.birthYear,
      occupation: req.body.occupation,
      restaurantId: req.body.restaurantId
    }
    
    db
      .collection('customers')
      .add(customerData)

    res
      .status(200)
      .json({
        msg: 'Data successfully added',
        data: customerData
      })    

  }

  static listCustomer (req, res) {
    db
      .collection('customers')
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

  static specificCustomer (req, res) {
    db
      .collection('customers')
      .doc(req.params.id)
      .get()

      .then((result) => {
        let dataCustomer = result.data()
        dataCustomer.id = result.id

        res
        .status(200)
        .json({
          msg: "This is your customer",
          data: dataCustomer
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

  static updateCustomer (req, res) {
    let customerData = req.body;
    customerData.id = req.params.id;

    db
      .collection('customers')
      .doc(req.params.id)
      .update(req.body)

    .then(result => {
      res
        .status(200)
        .json({
          msg: "Data successfully updated",
          data: customerData,
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

  static deleteCustomer (req, res) {
    db
    .collection('customers')
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

module.exports = CustomerController
