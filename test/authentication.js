const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp)

describe('Authentication', function() {
  this.timeout(10000)
  it('should list all owners /authentication GET', function(done) {
    chai.request(server)
      .get('/authentication')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('uid');
        res.body.data[0].should.have.property('displayName');
        res.body.data[0].should.have.property('email');
        res.body.data[0].should.have.property('photoURL');
        res.body.data[0].should.have.property('email');
        done();
      });
  })

  // it('should return 500 /authentication GET', function(done) {
  //   chai.request(server)
  //     .get('/authentication')
  //     .end(function(err, res){
  //       res.should.have.status(500);
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('msg');
  //       res.body.should.have.property('data');
  //       done();
  //     });
  // })
})