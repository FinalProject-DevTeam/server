const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('AWS', function () {
  this.timeout(10000);

  it('should list all index of customers with a predicted food preference which is equal to the one provided /aws/prediction/:id GET', function (done) {
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


});
