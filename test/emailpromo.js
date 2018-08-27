const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const moment = require('moment');

chai.use(chaiHttp)

describe('Email Promo', function() {

  it('should send email to customers with prediction ML by specific food on /emailpromo POST', function(done) {
    this.timeout(5000)
    chai.request(server)
      .post(`/emailpromo`)
      .send({
        receiver: "alibaihaqi1704@gmail.com",
        owneremail: 'hacktiv@yomail.com',
        subject:"PROMO NICH",
        content:'CONTENTNYA ISI SENDIRI'
      })
      .end(function(error, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('request')
        res.body[0].should.have.property('statusCode')
        res.body[0].should.have.property('headers')
        done();
    });
  });

  it('should send email to customers with prediction ML by specific food on /emailpromo POST', function(done) {
    this.timeout(5000)
    chai.request(server)
      .post(`/emailpromo`)
      .send({
        to: "alibaihaqi1704@gmail.com",
        from: 'hacktiv@yomail.com',
        subject:"PROMO NICH",
        content:'CONTENTNYA ISI SENDIRI'
      })
      .end(function(error, res){
        res.should.have.status(500);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
    });
  });

})