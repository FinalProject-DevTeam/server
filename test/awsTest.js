const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('AWS', function () {
  this.timeout(10000);

  it('should return array /aws/prediction/:id GET', function (done) {
    chai.request(server)
      .get(`/aws/prediction/52mSFsSFmRW4IRZr1i8acr6xWrv2`)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.an('array');
      done();
    });
  });

  it('should return 200 /aws/prediction/:id POST', function (done) {
    chai.request(server)
      .post(`/aws/prediction/52mSFsSFmRW4IRZr1i8acr6xWrv2`)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.a('json')
      done();
    });
  });

  it('should return 400 /aws/prediction/:id POST', function (done) {
    chai.request(server)
      .post(`/aws/prediction/`)
      .end(function (err, res) {
        res.should.have.status(400);
        res.should.be.a('json')
      done();
    });
  });

  it('should return 200 /aws/model/:id POST', function (done) {
    chai.request(server)
      .post(`/aws/model/52mSFsSFmRW4IRZr1i8acr6xWrv2`)
      .end(function (err, res) {
        res.should.have.status(200);
      done();
    });
  });

  it('should return string and status 200 /aws/s3/:id POST', function (done) {
    chai.request(server)
      .post(`/aws/s3/52mSFsSFmRW4IRZr1i8acr6xWrv2`)
      .send({
        "columns": {
          "gender": "gender",
          "birthYear": "birthyear",
          "occupation": "occupation"
        },
        "arrData": [
          [1, 2000, "Teacher"],
          [0, 1980, "Student"]
        ],
        "folderName": "customersData",
        "dataName": "customers-data"
      })
    .end(function (err, res) {
      res.should.have.status(200);
      res.should.be.a('string');
    });
  })

  it('should return 400 /aws/s3/:id POST', function (done) {
    chai.request(server)
      .post(`/aws/s3/52mSFsSFmRW4IRZr1i8acr6xWrv2`)
      .send({})
      .end(function (err, res) {
        res.should.have.status(400);
        res.should.be.a('string');
    });
  });

  it('should return 200 /aws/datasource/:id POST', function (done) {
    chai.request(server)
      .post(`/aws/datasource/52mSFsSFmRW4IRZr1i8acr6xWrv2`)
      .end(function (err, res) {
        res.should.have.status(200);
      })
  })

});
