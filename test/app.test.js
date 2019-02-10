const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const App = require('../app');
const server = require('../app');

const config = require('../config/config');

const should = chai.should();

chai.use(chaiHttp);

describe(`Test for : App`, () => {
  describe('/GET app', () => {
    it('it should GET on app', (done) => {
      chai
        .request(server)
        .get('/test')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
