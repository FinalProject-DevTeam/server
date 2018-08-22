const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp)

// describe('Authentication', function() {
//   it('should list all owners /authentication GET', function(done) {
//     chai.request(server)
//       .get('/authentication')
//       .end(function(err, res){
//         res.should.have.status(200);
//         res.body.data.should.be.a('array');
//         res.body.data[0].should.have.property('uid');
//         res.body.data[0].should.have.property('displayName');
//         res.body.data[0].should.have.property('email');
//         res.body.data[0].should.have.property('photoURL');
//         res.body.data[0].should.have.property('email');
//         done();
//       });
//   })
// })

// describe('Customer', function() {

//   it('should has customer attribute on /customer POST', function(done) {
//     chai.request(server)
//       .post('/customer')
//       .send({
//         name: "johnthor",
//         gender: "male",
//         email: "johnthor@mail.com",
//         phoneNumber: "+628123456778",
//         birthYear: "1999",
//         occupation: "student",
//         restaurantId: "12345"
//       })
//       .end(function(err, res){
//         res.should.have.status(200);
//         res.body.data.should.be.a('object');
//         res.body.should.have.property('msg');
//         res.body.should.have.property('data');
//         res.body.data.should.have.property('name');
//         res.body.data.should.have.property('gender');
//         res.body.data.should.have.property('email');
//         res.body.data.should.have.property('birthYear');
//         res.body.data.should.have.property('phoneNumber');
//         res.body.data.should.have.property('occupation');
//         res.body.data.should.have.property('restaurantId');
//         done();
//       });
//   });
  
//   it('should list all customers with specific owner /customer GET', function(done) {
//     this.timeout(10000)
//     chai.request(server)
//       .get('/customer')
//       .end(function(err, res){
//           res.should.have.status(200);
//           res.body.data.should.be.a('array');
//           res.body.data[0].should.have.property('id');
//           res.body.data[0].should.have.property('name');
//           res.body.data[0].should.have.property('gender');
//           res.body.data[0].should.have.property('email');
//           res.body.data[0].should.have.property('birthYear');
//           res.body.data[0].should.have.property('phoneNumber');
//           res.body.data[0].should.have.property('occupation');
//           res.body.data[0].should.have.property('restaurantId');
//         done();
//       });
//   });

//   it('should list specific customer with specific owner /customer/:id GET', function(done) {
//     chai.request(server)
//       .get(`/customer/0lT4Vw5B6fJWWNVtrCmQ`)
//       .end(function(err, res){
//           res.should.have.status(200);
//           res.body.should.have.property('msg');
//           res.body.should.have.property('data');
//           res.body.data.should.be.a('object');
//           res.body.data.should.have.property('id');
//           res.body.data.should.have.property('name');
//           res.body.data.should.have.property('gender');
//           res.body.data.should.have.property('email');
//           res.body.data.should.have.property('birthYear');
//           res.body.data.should.have.property('phoneNumber');
//           res.body.data.should.have.property('occupation');
//           res.body.data.should.have.property('restaurantId');
//         done();
//       });
//   });


//   it('should update customer attribute on /customer/<id> PUT', function(done) {
//     chai.request(server)
//       .put(`/customer/0b1Dv8yTGrenODzOXJd0`)
//       .send({
//         name: "johnny",
//         gender: "male",
//         email: "johny@mail.com",
//         phoneNumber: "+628123456778",
//         birthYear: "1995",
//         occupation: "student",
//         restaurantId: "12345",
//       })
//       .end(function(error, res){
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.body.data.should.have.property('name');
//         res.body.data.should.have.property('gender');
//         res.body.data.should.have.property('email');
//         res.body.data.should.have.property('birthYear');
//         res.body.data.should.have.property('phoneNumber');
//         res.body.data.should.have.property('occupation');
//         res.body.data.should.have.property('restaurantId');
//         done();
//     });
//   });

//   it('should delete a SINGLE customer on /customer/<id> DELETE', function(done) {
//     chai.request(server)
//       .delete(`/customer/0b1Dv8yTGrenODzOXJd0`)
//       .end(function(error, res){
//         res.should.have.status(200);
//         res.should.be.json;
//         res.body.should.be.a('object');
//         done();
//     });
//   });
// });