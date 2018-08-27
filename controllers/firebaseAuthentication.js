var admin = require('firebase-admin');
var auth = admin.auth();

class AuthenticationController {
  static getOwners (req, res) {
    auth.listUsers(100)
      .then( listUsersResult => {
        let ownersData = [];
        listUsersResult.users.forEach(function(userRecord) {
          ownersData.push(userRecord);
        })
        
        res
          .status(200)
          .json({
            msg: "this is all list owners",
            data: ownersData
          })
      })
  }
}

module.exports = AuthenticationController;
