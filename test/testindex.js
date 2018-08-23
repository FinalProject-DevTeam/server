const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const moment = require('moment');

chai.use(chaiHttp)

describe('App and Index', function() {

  it('should return 404 if routes exclude "/", "/authentication", "transaction", "/customer" ', function(done) {
    this.timeout(10000)
    chai.request(server)
      .get('/joko')
      .end(function(err, res){
          res.should.have.status(404);
        done();
      });
  });

  it('should return 200 with message "Welcome to express" ', function(done) {
    this.timeout(10000)
    chai.request(server)
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('msg');
        done();
      });
  });
})