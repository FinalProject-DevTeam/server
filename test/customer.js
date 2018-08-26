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
        name: "Djoko Santoso",
        gender: "Male",
        email: "djoksan@mail.com",
        phoneNumber: "+628353456778",
        birthYear: "1993",
        occupation: "CEO",
        restaurantId: "WyEP0111rVUlmESeZyX5Z2bxgrh1",
        createdAt: new Date(),
        updatedAt: new Date(),
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
    this.timeout(5000)
    chai.request(server)
      .get(`/customer`)
      .set('uid', 'WyEP0111rVUlmESeZyX5Z2bxgrh1')
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

  it('should return 500 /customer GET', function(done) {
    this.timeout(10000)
    chai.request(server)
      .get('/customer')
      .end(function(err, res){
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('msg');
          res.body.should.have.property('data');
        done();
      });
  });

  it('should list specific customer with specific owner /customer/:id GET', function(done) {
    this.timeout(5000)
    chai.request(server)
      .get(`/customer/SGY5JD6IqrbaV7t3E0M9`)
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
      .get(`/customer/0lT4Vw5B6fJWWNVtrC`)
      .end(function(err, res){
        // console.log(res.body)
          res.should.have.status(500);
          res.body.should.have.property('msg');
          res.body.should.have.property('data');
          res.body.should.be.a('object');
        done();
      });
  });


  it('should update customer attribute on /customer/<id> PUT', function(done) {
    chai.request(server)
      .put(`/customer/4e80ovTypW9xzXxLwRLV`)
      .send({
        name: "Djoko Santoso",
        gender: "Male",
        email: "djoksan@mail.com",
        phoneNumber: "+628353456778",
        birthYear: "1993",
        occupation: "CFO",
        restaurantId: "WyEP0111rVUlmESeZyX5Z2bxgrh1",
        createdAt: new Date(),
        updatedAt: new Date(),
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
      .put(`/customer/0b1Dv8yTGrenODzOXJd0`)
      .send({
        name: "Djoko Santoso",
        gender: "Male",
        email: "djoksan@mail.com",
        phoneNumber: "+628353456778",
        birthYear: "1993",
        occupation: "CFO",
        restaurantId: "WyEP0111rVUlmESeZyX5Z2bxgrh1",
        createdAt: new Date(),
        updatedAt: new Date(),
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
      .delete(`/customer/X42Z3uZ0nWghKk0LmTWK`)
      .end(function(error, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
    });
  });

});