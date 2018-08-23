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
        restaurantId: "12345",
        customerId: "1234",
        itemsOrdered: ['Fried Chicken', 'Indomie']
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
      .set('uid', '12345')
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

  it('should return 500 /transaction GET', function(done) {
    this.timeout(10000)
    chai.request(server)
      .get('/transaction')
      .end(function(err, res){
          res.should.have.status(500);
          res.body.data.should.be.a('object');
          res.body.should.have.property('msg');
          res.body.should.have.property('data');
        done();
      });
  });

  it('should list specific transaction with specific owner /transaction/<id> GET', function(done) {
    chai.request(server)
      .get(`/transaction/sWSMne2m3XTW0oFm3AkW`)
      .end(function(err, res){
        // console.log(res.body)
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

  it('should return 500 /transaction/<id> GET', function(done) {
    chai.request(server)
      .get(`/transaction/sWSMne2m3XTW0oFm3Ak`)
      .end(function(err, res){
        // console.log(res.body)
          res.should.have.status(500);
          res.body.should.have.property('msg');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
        done();
      });
  });

  it('should update transaction attribute on /transaction/<id> PUT', function(done) {
    chai.request(server)
      .put(`/transaction/sWSMne2m3XTW0oFm3AkW`)
      .send({
        restaurantId: "12345",
        customerId: "1234",
        itemsOrdered: ['Hainan Rice', 'Indomie'],
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
      .put(`/transaction/sWSMne2m3XTW0oFm3Ak`)
      .send({
        restaurantId: "12345",
        customerId: "1234",
        itemsOrdered: ['French Fries', 'Indomie'],
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
      .delete(`/transaction/FDB0aVkb48lwZvCWbkPu`)
      .end(function(error, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
    });
  });
})
