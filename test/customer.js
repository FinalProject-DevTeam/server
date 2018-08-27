const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const moment = require('moment');

chai.use(chaiHttp)

describe('Customer', function() {

  it('should add customer on /customer POST', function(done) {
    chai.request(server)
      .post(`/customer`)
      .send({
        name: "Halo1",
        gender: "Male",
        email: "halo1@mail.com",
        phoneNumber: "+628353456778",
        birthYear: "1001",
        occupation: "Sales Man",
        restaurantId: "gMCpFRxvkIa3kfBiDrqUTxCRvS73",
        createdAt: moment().format('LLL'),
        updatedAt: moment().format('LLL'),
      })
      .end(function(error, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('gender');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('birthYear');
        res.body.data.should.have.property('phoneNumber');
        res.body.data.should.have.property('occupation');
        res.body.data.should.have.property('restaurantId');
        res.body.data.should.have.property('createdAt');
        res.body.data.should.have.property('updatedAt');
        done();
    });
  });

  it('should add customer on /customer POST', function(done) {
    chai.request(server)
      .post(`/customer`)
      .send({
        name: "Lisa1",
        gender: "Female",
        email: "lisa1@mail.com",
        phoneNumber: "+628353456778",
        birthYear: "1001",
        occupation: "Business Man",
        restaurantId: "gMCpFRxvkIa3kfBiDrqUTxCRvS73",
        createdAt: moment().format('LLL'),
        updatedAt: moment().format('LLL'),
      })
      .end(function(error, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('gender');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('birthYear');
        res.body.data.should.have.property('phoneNumber');
        res.body.data.should.have.property('occupation');
        res.body.data.should.have.property('restaurantId');
        res.body.data.should.have.property('createdAt');
        res.body.data.should.have.property('updatedAt');
        done();
    });
  });

  it('should list All customers with specific owner /customer GET', function(done) {
    this.timeout(10000)
    chai.request(server)
      .get(`/customer`)
      .set('uid', 'gMCpFRxvkIa3kfBiDrqUTxCRvS73')
      .end(function(err, res){
          res.should.have.status(200);
          res.body.should.have.property('msg');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('name');
          res.body.data[0].should.have.property('gender');
          res.body.data[0].should.have.property('email');
          res.body.data[0].should.have.property('birthYear');
          res.body.data[0].should.have.property('phoneNumber');
          res.body.data[0].should.have.property('occupation');
          res.body.data[0].should.have.property('restaurantId');
          res.body.data[0].should.have.property('createdAt');
          res.body.data[0].should.have.property('updatedAt');
        done();
      });
  });

  it('should get all customers and will be listed by date', function(done) {
    this.timeout(10000)
    chai.request(server)
      .get(`/customer/listbydate`)
      .set('uid', 'gMCpFRxvkIa3kfBiDrqUTxCRvS73')
      .end(function(err, res){
          res.should.have.status(200);
          res.body.should.have.property('msg');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('name');
          res.body.data[0].should.have.property('gender');
          res.body.data[0].should.have.property('email');
          res.body.data[0].should.have.property('birthYear');
          res.body.data[0].should.have.property('phoneNumber');
          res.body.data[0].should.have.property('occupation');
          res.body.data[0].should.have.property('restaurantId');
          res.body.data[0].should.have.property('createdAt');
          res.body.data[0].should.have.property('updatedAt');
        done();
      });
  })

  it('should get all customers and will be listed by date', function(done) {
    this.timeout(10000)
    chai.request(server)
      .get(`/customer/listbydate`)
      .set('uid', 'gMCpFRxvkIa3kfBiD')
      .end(function(err, res){
          res.should.have.status(200);
          res.body.should.have.property('msg');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('name');
          res.body.data[0].should.have.property('gender');
          res.body.data[0].should.have.property('email');
          res.body.data[0].should.have.property('birthYear');
          res.body.data[0].should.have.property('phoneNumber');
          res.body.data[0].should.have.property('occupation');
          res.body.data[0].should.have.property('restaurantId');
          res.body.data[0].should.have.property('createdAt');
          res.body.data[0].should.have.property('updatedAt');
        done();
      });
  })

  it('should get customers filtered by food /customer/email/<food> GET', function(done) {
    this.timeout(5000)
    chai.request(server)
      .get(`/customer/email/Nasi+Goreng`)
      .set('uid', 'gMCpFRxvkIa3kfBiDrqUTxCRvS73')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.have.property('msg');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('should get customers filtered by food /customer/email/<food> GET', function(done) {
    this.timeout(5000)
    chai.request(server)
      .get(`/customer/email/Nasi+Goreng`)
      .set('uid', 'gMCpFRxvkIa3kfBiDrqUT')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.have.property('msg');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('should get customers filtered by food /customer/email/<food> GET', function(done) {
    this.timeout(5000)
    chai.request(server)
      .get(`/customer/email/Sate`)
      .set('uid', 'gMCpFRxvkIa3kfBiDrqUTxCRvS73')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.have.property('msg');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('should get customers filtered by food /customer/sms/<food> GET', function(done) {
    this.timeout(5000)
    chai.request(server)
      .get(`/customer/sms/Nasi+Goreng`)
      .set('uid', 'gMCpFRxvkIa3kfBiDrqUT')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.have.property('msg');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('should get customers filtered by food /customer/sms/<food> GET', function(done) {
    this.timeout(5000)
    chai.request(server)
      .get(`/customer/sms/Nasi+Goreng`)
      .set('uid', 'gMCpFRxvkIa3kfBiDrqUTxCRvS73')
      .end(function(err, res){
          console.log(res.body)
          res.should.have.status(200);
          res.body.should.have.property('msg');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');

        done();
      });
  });

  it('should get customers filtered by food /customer/sms/<food> GET', function(done) {
    this.timeout(5000)
    chai.request(server)
      .get(`/customer/sms/Sate`)
      .set('uid', 'gMCpFRxvkIa3kfBiDrqUTxCRvS73')
      .end(function(err, res){
          console.log(res.body)
          res.should.have.status(200);
          res.body.should.have.property('msg');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');

        done();
      });
  });

  it('should list specific customer with specific owner /customer/:id GET', function(done) {
    this.timeout(5000)
    chai.request(server)
      .get(`/customer/fTIk86PHIQJtgFjw89fd`)
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.have.property('msg');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('gender');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('birthYear');
        res.body.data.should.have.property('phoneNumber');
        res.body.data.should.have.property('occupation');
        res.body.data.should.have.property('restaurantId');
        res.body.data.should.have.property('createdAt');
        res.body.data.should.have.property('updatedAt');
        done();
      });
  });

  it('should return 500 /customer/:id GET', function(done) {
    this.timeout(5000)
    chai.request(server)
      .get(`/customer/hosNtymzkShjregA3En`)
      .end(function(err, res){
        // console.log(res.body)
          res.should.have.status(500);
          res.body.should.have.property('msg');
          res.body.should.have.property('data');
          res.body.should.be.a('object');
        done();
      });
  });

  it('should set data customer attribute on /customer/setdata/<id> POST', function(done) {
    chai.request(server)
      .post(`/customer/setdata/fTIk86PHIQJtgFjw89fd`)
      .send({
        name: "Djoko TEST",
        gender: "Female",
        email: "DOJOKOTEST@gmail.com",
        phoneNumber: "628353456778",
        birthYear: "1993",
        occupation: "Police Man",
        restaurantId: "gMCpFRxvkIa3kfBiDrqUTxCRvS73",
        foodfav: 'Nasi Goreng',
        createdAt: moment().format('LLL'),
      })
      .end(function(error, res){
        console.log(res.body)
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('gender');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('birthYear');
        res.body.data.should.have.property('phoneNumber');
        res.body.data.should.have.property('occupation');
        res.body.data.should.have.property('restaurantId');
        res.body.data.should.have.property('createdAt');
        res.body.data.should.have.property('updatedAt');
        done();
    });
  });

  it('should set data customer attribute on /customer/setdata/<id> POST', function(done) {
    chai.request(server)
      .post(`/customer/setdata/fTIk86PHIQJtgFjw89fd`)
      .send({
        name: "Djoko TEST",
        gender: "Male",
        email: "DOJOKOTEST@gmail.com",
        phoneNumber: "628353456778",
        birthYear: "1993",
        occupation: "Police Man",
        restaurantId: "gMCpFRxvkIa3kfBiDrqUTxCRvS73",
        foodfav: 'Nasi Goreng',
        createdAt: moment().format('LLL'),
      })
      .end(function(error, res){
        console.log(res.body)
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('gender');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('birthYear');
        res.body.data.should.have.property('phoneNumber');
        res.body.data.should.have.property('occupation');
        res.body.data.should.have.property('restaurantId');
        res.body.data.should.have.property('createdAt');
        res.body.data.should.have.property('updatedAt');
        done();
    });
  });
  
  it('should update customer attribute on /customer/<id> PUT', function(done) {
    chai.request(server)
      .put(`/customer/fTIk86PHIQJtgFjw89fd`)
      .send({
        name: "Djoko TEST",
        gender: "Male",
        email: "DOJOKOTEST@mail.com",
        phoneNumber: "+628353456778",
        birthYear: "1993",
        occupation: "Police Man",
        restaurantId: "gMCpFRxvkIa3kfBiDrqUTxCRvS73",
        createdAt: moment().format('LLL'),
        updatedAt: moment().format('LLL'),
      })
      .end(function(error, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('gender');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('birthYear');
        res.body.data.should.have.property('phoneNumber');
        res.body.data.should.have.property('occupation');
        res.body.data.should.have.property('restaurantId');
        res.body.data.should.have.property('createdAt');
        res.body.data.should.have.property('updatedAt');
        done();
    });
  });

  it('should return 500 /customer/<id> PUT', function(done) {
    this.timeout(5000);
    chai.request(server)
      .put(`/customer/fTIk86PHIQJtgFjw89`)
      .send({
        name: "Djoko TEST!",
        gender: "Male",
        email: "DOJJOKOTEST@mail.com",
        phoneNumber: "+628353456778",
        birthYear: "1993",
        occupation: "CFO",
        restaurantId: "gMCpFRxvkIa3kfBiDrqUTxCRvS73",
        createdAt: moment().format('LLL'),
        updatedAt: moment().format('LLL'),
      })
      .end(function(error, res){
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('msg');
        res.body.should.have.property('data');
        done();
    });
  });

  it('should delete a SINGLE customer on /customer/<id> DELETE', function(done) {
    chai.request(server)
      .delete(`/customer/c9YS1OTO0S4rUu5hsuIf`)
      .end(function(error, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
    });
  });

});