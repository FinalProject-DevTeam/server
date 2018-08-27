const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const moment = require('moment');

chai.use(chaiHttp)

describe('Transactions', function() {

  after(function () {
    process.exit(0)
  });

  it('should has customer attribute on /transaction POST', function(done) {
    chai.request(server)
      .post('/transaction')
      .send({
        restaurantId: "gMCpFRxvkIa3kfBiDrqUTxCRvS73",
        customerId: "fTIk86PHIQJtgFjw89fd",
        itemsOrdered: ['Nasi Hainan', 'Burger']
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.body.data.should.be.a('object');
        res.body.should.have.property('msg');
        res.body.should.have.property('data');
        res.body.data.should.have.property('restaurantId');
        res.body.data.should.have.property('customerId');
        res.body.data.should.have.property('itemsOrdered');
        res.body.data.should.have.property('itemsOrderedML');
        done();
      });
  });

  it('should list all transactions with specific owner /transaction GET', function(done) {
    this.timeout(10000)
    chai.request(server)
      .get('/transaction')
      .set('uid', 'gMCpFRxvkIa3kfBiDrqUTxCRvS73')
      .end(function(err, res){
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.should.have.property('msg');
          res.body.should.have.property('data');
          res.body.data[0].should.have.property('restaurantId');
          res.body.data[0].should.have.property('customerId');
          res.body.data[0].should.have.property('itemsOrdered');
          res.body.data[0].should.have.property('itemsOrderedML');
        done();
      });
  });

  it('should list specific transaction with specific owner /transaction/<id> GET', function(done) {
    chai.request(server)
      .get(`/transaction/oRmAgz1tLAOUzbv0iPS8`)
      .end(function(err, res){
          res.should.have.status(200);
          res.body.should.have.property('msg');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('restaurantId');
          res.body.data.should.have.property('customerId');
          res.body.data.should.have.property('itemsOrdered');
          res.body.data.should.have.property('itemsOrderedML');
        done();
      });
  });

  it('should update transaction attribute on /transaction/<id> PUT', function(done) {
    chai.request(server)
      .put(`/transaction/oRmAgz1tLAOUzbv0iPS8`)
      .send({
        restaurantId: "gMCpFRxvkIa3kfBiDrqUTxCRvS73",
        customerId: "fTIk86PHIQJtgFjw89fd",
        itemsOrdered: ['Nasi Hainan', 'Burger'],
        createdAt: moment().format('LLL')
      })
      .end(function(error, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('msg');
        res.body.should.have.property('data');
        res.body.data.should.have.property('restaurantId');
        res.body.data.should.have.property('customerId');
        res.body.data.should.have.property('itemsOrdered');
        res.body.data.should.have.property('itemsOrderedML');
        done();
    });
  });

  it('should return 500 /transaction/<id> PUT', function(done) {
    chai.request(server)
      .put(`/transaction/oRmAgz1tLAOUzbv0iPS`)
      .send({
        restaurantId: "gMCpFRxvkIa3kfBiDrqUTxCRvS73",
        customerId: "Briy8EfixCqMUiLhF0It",
        itemsOrdered: ['Nasi Hainan', 'Burger'],
        createdAt: moment().format('LLL')
      })
      .end(function(error, res){
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('msg');
        res.body.should.have.property('data');
        done();
    });
  });

  it('should delete a SINGLE transaction on /transaction/<id> DELETE', function(done) {
    chai.request(server)
      .delete(`/transaction/oRmAgz1tLAOUzbv0`)
      .end(function(error, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
    });
  });
})
