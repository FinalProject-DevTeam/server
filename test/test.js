const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app')
const should = chai.should();

let url = 'http://localhost:3000'
chai.use(chaiHttp)