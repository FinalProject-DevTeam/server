var admin = require('firebase-admin');
//------PRODUCTION-------
var serviceAccount = require('../keyfile.json');
//------DEVELOPMENT------
// var serviceAccount = require('../keyfile-dev.json');
var moment = require('moment');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //-------PRODUCTION---------
  databaseURL: process.env.DATABASEURL,
  //-------DEVELOPMENT--------
  // databaseURL: process.env.DATABASEURLDEV,
});


var db = admin.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

class CustomerController {
  static addCustomer (req, res) {
    let binaryGender;

    if (req.body.gender === "Male") {
      binaryGender = 1;
    }
    else {
      binaryGender = 0;
    }

    let newOccupation = '';
    for (let i = 0; i < req.body.occupation.length; i++) {
      if(req.body.occupation[i] === ' ') {
        newOccupation += '.';
      }
      else {
        newOccupation += req.body.occupation[i];
      }
    }

    let customerData = {
      name: req.body.name,
      gender: req.body.gender,
      genderML: binaryGender,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      birthYear: req.body.birthYear,
      occupation: req.body.occupation,
      occupationML: newOccupation,
      restaurantId: req.body.restaurantId,
      createdAt: moment().format('LLL'),
      updatedAt: moment().format('LLL'),
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
  }

  static listCustomerByDate (req, res) {
    db
      .collection('customers')
      .orderBy('createdAt', 'asc')
      .get()

    .then((snapshot) => {
      let dataCustomers = [];
      snapshot.forEach((doc) => {
        if (doc.data().restaurantId === req.headers.uid) {
          let objCustomer = doc.data();
          objCustomer.id = doc.id;
          dataCustomers.push(objCustomer)
        }
      });
      res
        .status(200)
        .json({
          msg: "This is your customers",
          data: dataCustomers
        })
    })
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

  static getDataEmailByFood (req, res) {
    let foodFilter = req.params.food

    if (foodFilter.indexOf('+') !== -1) {
      foodFilter = foodFilter.split('+').join(' ');
    }

    db
      .collection('customers')
      .where('foodfav', '==', foodFilter)
      .get()

      .then((snapshot) => {
        let dataCustomers = [];
        snapshot.forEach((doc) => {
          if (doc.data().restaurantId === req.headers.uid) {
            dataCustomers.push(doc.data().email)
          }
        });
        res
          .status(200)
          .json({
            msg: "This is your customers with specific food",
            data: dataCustomers
          })
      })
  }


  static getDataPhoneNumber (req, res) {
    let foodFilter = req.params.food
    if (foodFilter.indexOf('+') !== -1) {
      foodFilter = foodFilter.split('+').join(' ');
    }

    db
      .collection('customers')
      .where('foodfav', '==', foodFilter)
      .get()

      .then((snapshot) => {
        let dataCustomers = [];
        snapshot.forEach((doc) => {
          if (doc.data().restaurantId === req.headers.uid) {
            dataCustomers.push(doc.data().phoneNumber)
          }
        });
        res
          .status(200)
          .json({
            msg: "This is your customers with specific food by phone number",
            data: dataCustomers
          })
      })

  }



  static updateCustomer (req, res) {
    let customerData = {
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      birthYear: req.body.birthYear,
      occupation: req.body.occupation,
      restaurantId: req.body.restaurantId,
      createdAt: req.body.createdAt,
      updatedAt: moment().format('LLL'),
    }
    customerData.id = req.params.id;

    db
      .collection('customers')
      .doc(req.params.id)
      .update(customerData)
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

  static setNewCustomer(req, res) {
    console.log(req.body)

    let binaryGender;
    if (req.body.gender === "Male") {
      binaryGender = 1;
    }
    else {
      binaryGender = 0;
    }

    let newOccupation = '';
    for (let i = 0; i < req.body.occupation.length; i++) {
      if(req.body.occupation[i] === ' ') {
        newOccupation += '.';
      }
      else {
        newOccupation += req.body.occupation[i];
      }
    }

    let customerData = {
      name: req.body.name,
      gender: req.body.gender,
      genderML: binaryGender,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      birthYear: req.body.birthYear,
      occupation: req.body.occupation,
      occupationML: newOccupation,
      restaurantId: req.body.restaurantId,
      foodfav: req.body.foodfav,
      createdAt: req.body.createdAt,
      updatedAt: moment().format('LLL'),
    }

    // console.log("hasil", req.body.id, customerData)

    db
      .collection('customers')
      .doc(req.params.id)
      .set(customerData)

      .then(() => {
        res
          .status(200)
          .json({
            msg: 'success setdata',
            data: customerData
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

  }
}

module.exports = CustomerController
