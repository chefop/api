//During the test the env variable is set to test
process.env.SERV_ENV = 'test';

let mongoose = require("mongoose");
let Starter = require('../api/models/Starter');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Starter', () => {
    beforeEach((done) => { //Before each test we empty the database
        Starter.remove({}, (err) => {
           done();
        });
    });
/*
  * Test the /GET route
  */
    describe('/GET starter', () => {
      it('it should GET all the starters', (done) => {
        chai.request(server)
            .get('/starters')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
    });

});
