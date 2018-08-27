const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp)

describe('SMS Promo', function() {

  it('should send sms to customers with prediction ML by specific food on /smspromo POST', function(done) {
    this.timeout(10000)
    chai.request(server)
      .post(`/smspromo`)
      .send({
        content:'CONTENTNYA ISI SENDIRI',
        AllNumber: ['6281224784692', '6281384643722']
      })
      .end(function(error, res){
        console.log(res.body)
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
    });
  });

  it('should return 200 /smspromo but rejected POST', function(done) {
    this.timeout(10000)
    chai.request(server)
      .post(`/smspromo`)
      .send({
        content:'CONTENTNYA ISI SENDIRI',
        AllNumber: '6281224784692',
      })
      .end(function(error, res){
        console.log(res.body)
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
    });
  })

})