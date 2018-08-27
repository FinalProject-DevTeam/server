const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const moment = require('moment');

chai.use(chaiHttp)

describe('customerPopulate', function() {

  it(`should list all transactions with customer data inside it /populate GET`, function(done) {
    this.timeout(15000)
    chai.request(server)
      .get(`/populate`)
      .set('uid', 'gMCpFRxvkIa3kfBiDrqUTxCRvS73')
      .end(function(err, res){
        // console.log(res.body[0])
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.be.a('object')
          res.body[0].should.have.property('itemsOrdered');
          res.body[0].should.have.property('createdAt');
          res.body[0].should.have.property('updatedAt');
          res.body[0].should.have.property('customerId');
          res.body[0].should.have.property('itemsOrderedML');
          res.body[0].should.have.property('restaurantId');
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('customer');
          res.body[0].customer.should.have.property('occupation');
          res.body[0].customer.should.have.property('restaurantId');
          res.body[0].customer.should.have.property('name');
          res.body[0].customer.should.have.property('gender');
          res.body[0].customer.should.have.property('email');
          res.body[0].customer.should.have.property('birthYear');
          res.body[0].customer.should.have.property('phoneNumber');
          res.body[0].customer.should.have.property('createdAt');
          res.body[0].customer.should.have.property('updatedAt');
        done();
      });
  })

})