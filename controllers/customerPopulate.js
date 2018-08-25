var admin = require('firebase-admin');
var serviceAccount = require('../keyfile.json');
var moment = require('moment');

var db = admin.firestore();

exports.getAllPopulate = function (req, res) {
  getPopulate()
    .then((populate) => {
          // console.log("All populate " + populate) 
          // All populate with its todo_items sub collection.
          return res
                    .status(200)
                    .json(populate);
      })
      .catch((err) => {
          // console.log('Error getting documents', err);
          return res
                    .status(500)
                    .json({ message: "Error getting the all Todos" + err });
      });
}

function getPopulate(){
  var transactionsRef = db
                          .collection('transactions')
  return transactionsRef.get()
      .then((snapshot) => {
          let dataTransactions = [];
          return Promise.all(
              snapshot.docs.map(doc => {  
                
                      let transaction = doc.data();                
                      transaction.id = doc.id;
                      var transactionCustomerPromise = getCustomerById(transaction.customerId);
                      return transactionCustomerPromise.then((customerData) => {                    
                              transaction.customer = customerData;
                              dataTransactions.push(transaction);         
                              return dataTransactions;                  
                          }) 
              })
          )
          .then(result => {
              return result.length > 0 ? result[result.length - 1] : [];
          })

      })
}


function getCustomerById(id){
  var CustomerRef = db.collection('customers').doc(id)
  let customer = {};
  return CustomerRef.get()
      .then(snapshot => {
          customer = snapshot.data();
          customer.id = snapshot.id;
          return customer;
      })
}