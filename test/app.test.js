const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

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
