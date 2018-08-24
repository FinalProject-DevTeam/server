const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

const date = new Date();
const today = `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;

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
      .post(`/aws/prediction`)
      .end(function (err, res) {
        res.should.have.status(404);
        res.should.be.a('json')
      done();
    });
  });

  it('should return 200 /aws/predictionstatus/:id GET', function (done) {
    chai.request(server)
      .get(`/aws/predictionstatus/${req.params.id}`)
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.a('json');
      });
  })

  it('should return 400 /aws/predictionstatus/:id GET', function (done) {
    chai.request(server)
      .get(`/aws/predictionstatus/dnsjnadsnas`)
      .end(function (err, res) {
        res.should.have.status(400)
      });
  })

  it('should return 400 /aws/prediction DELETE', function (done) {
    chai.request(server)
      .delete('/aws/prediction/sdadssadasd')
      .end(function (err, res) {
        res.should.have.status(400)
      })
  })

  it('should return 200 /aws/prediction POST', function (done) {
    chai.request(server)
      .post('/aws/prediction/52mSFsSFmRW4IRZr1i8acr6xWrv2')
      .end(function (err, res) {
        res.should.have.status(200)
      })
  })

  it('should return 200 /aws/model POST', function (done) {
    chai.request(server)
      .post(`/aws/model`)
      .end(function (err, res) {
        res.should.have.status(200);
      done();
    });
  });

  it('should return 200 /aws/model DELETE', function (done) {
    chai.request(server)
      .delete('/aws/model/01022018')
      .end(function (err, res) {
        res.should.have.status(200);
      })
  })

  it('should return 400 /aws/model DELETE', function (done) {
    chai.request(server)
      .delete('/aws/model/')
      .end(function (err, res) {
        res.should.have.status(400);
      })
  })

  it(`should return 200 /aws/model GET`, function (done) {
    chai.request(server)
      .get('/aws/model/01022018')
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.a('json')
      });
  })

  it('should return 400 /aws/model GET', function (done) {
    chai.request(server)
      .get('/aws/model/ ')
      .end(function (err, res) {
        res.should.have.status(400);
      });
  })

  it('should return string and status 200 /aws/s3 POST', function (done) {
    chai.request(server)
      .post(`/aws/s3`)
      .send({
        "id": "52mSFsSFmRW4IRZr1i8acr6xWrv2",
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

  it('should return 400 /aws/s3 POST', function (done) {
    chai.request(server)
      .post(`/aws/s3`)
      .send({"id": '"dssasasa"'})
      .end(function (err, res) {
        res.should.have.status(400);
        res.should.be.a('string');
    });
  });

  it('should return 200 /aws/datasource POST', function (done) {
    chai.request(server)
      .post(`/aws/datasource/`)
      .send({
      	"dataName": "transactions-data",
      	"folderName": "transactionsData"
      })
      .end(function (err, res) {
        res.should.have.status(200);
      });
  })

  it('should return 200 /aws/datasource POST', function (done) {
    chai.request(server)
      .post(`/aws/datasource/`)
      .send({
        "dataName": "customers-data",
        "folderName": "customersData",
        "id": "jsjajsaksjk"
      })
      .end(function (err, res) {
        res.should.have.status(200);
      });
  })

  it('should return 400 /aws/datasource POST', function (done) {
    chai.request(server)
      .post(`/aws/datasource/`)
      .end(function (err, res) {
        res.should.have.status(200);
      });
  })

  it(`should return 200 /aws/datasource DELETE`, function (done) {
    chai.request(server)
      .delete(`/aws/datasource/52mSFsSFmRW4IRZr1i8acr6xWrv2`)
      .end(function (err, res) {
        res.should.have.status(200);
      });
  })

  it(`should return 400 /aws/datasource DELETE`, function (done) {
    chai.request(server)
      .delete(`/aws/datasource/dsnsadnjnsadjnnjdsa`)
      .end(function (err, res) {
        res.should.have.status(400);
      });
  })

  it('should return 200 /aws/evaluation POST', function (done) {
    chai.request(server)
      .post('/aws/evaluation')
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.a('string')
      });
  })

  it('should return 200 /aws/evaluation DELETE', function (done) {
    chai.request(server)
      .delete(`/aws/evaluation/${today}`)
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.a('string')
      });
  })

  it('should return 400 /aws/evaluation DELETE', function (done) {
    chai.request(server)
      .delete(`/aws/evaluation/msdmadsmdasmas`)
      .end(function (err, res) {
        res.should.have.status(400)
        res.should.be.a('string')
      });
  })

  it('should return 200 /aws/datasource GET', function (done) {
    chai.request(server)
      .get('/aws/datasource/52mSFsSFmRW4IRZr1i8acr6xWrv2')
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.a('json')
      });
  })

  it('should return 400 /aws/datasource GET', function (done) {
    chai.request(server)
      .get('/aws/datasource/ndssand')
      .end(function (err, res) {
        res.should.have.status(400)
      });
  })

});
