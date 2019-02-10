const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const Allergen = require('../api/models/Allergen');
const server = require('../app');

const config = require('../config/config');

const should = chai.should();

chai.use(chaiHttp);

describe(`Test on BDD : test. For : Allergen`, () => {
  before((done) => {
    mongoose.set('useCreateIndex', true);
    mongoose.connect(`mongodb://localhost:27017/test`, {
      useNewUrlParser: true,
    });
    const db = mongoose.connection;
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('/POST allergen', () => {
    it('it should POST on allergen with data', (done) => {
      const allergen = {
        name: 'Nom test with empty data',
      };
      chai
        .request(server)
        .post('/allergens')
        .send(allergen)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST allergen', () => {
    it('it should POST on allergen with empty body', (done) => {
      chai
        .request(server)
        .post('/allergens')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/POST allergen', () => {
    it('it should POST on allergen with empty data', (done) => {
      const allergen = {
        name: '',
      };
      chai
        .request(server)
        .post('/allergens')
        .send(allergen)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe('/GET allergens', () => {
    it('it should GET all the allergens', (done) => {
      chai
        .request(server)
        .get('/allergens')
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200);
          res.should.be.an('object');
          done();
        });
    });
  });

  describe('/GET allergen', () => {
    it('it should GET one allergen', function(done) {
      const allergen = new Allergen({
        name: 'Nom test get one',
      });
      allergen.save().then((result) => {
        chai
          .request(server)
          .get('/allergens/' + result.id)
          .end(function(err, res) {
            res.should.be.json;
            res.should.have.status(200);
            res.should.be.an('object');
            result.should.have.property('name');
            done();
          });
      });
    });
  });

  describe('/GET allergen', () => {
    it('it should GET one allergen with empty id', function(done) {
      const allergen = new Allergen({
        name: 'Nom test get one with empty id',
      });
      allergen.save().then((result) => {
        chai
          .request(server)
          .get('/allergens/123')
          .end(function(err, res) {
            res.should.be.json;
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe('/DELETE allergen', () => {
    it('it should DELETE one allergen', function(done) {
      const allergen = new Allergen({
        name: 'Nom test delete one',
      });
      allergen.save().then((result) => {
        chai
          .request(server)
          .delete('/allergens/' + result.id)
          .end(function(err, res) {
            res.should.be.json;
            res.should.have.status(200);
            res.should.be.an('object');
            result.should.have.property('name');
            done();
          });
      });
    });
  });

  describe('/DELETE allergen', () => {
    it('it should DELETE one allergen with enpty id', function(done) {
      const allergen = new Allergen({
        name: 'Nom test delete one',
      });
      allergen.save().then((result) => {
        chai
          .request(server)
          .delete('/allergens/123')
          .end(function(err, res) {
            res.should.be.json;
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe('/PUT allergen', () => {
    it('it should PUT one allergen', function(done) {
      const allergen = new Allergen({
        name: 'Nom test put one',
      });
      allergen.save().then((result) => {
        chai
          .request(server)
          .get('/allergens/' + result.id)
          .end(function(err, res) {
            chai
              .request(server)
              .put('/allergens/' + result.id)
              .send({
                name: 'Nouveau nom',
              })
              .end(function(error, response) {
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.be.a('object');
                done();
              });
          });
      });
    });
  });

  describe('/PUT allergen', () => {
    it('it should PUT one allergen with empty id', function(done) {
      const allergen = new Allergen({
        name: 'Nom test put one',
      });
      allergen.save().then((result) => {
        chai
          .request(server)
          .get('/allergens/' + result.id)
          .end(function(err, res) {
            chai
              .request(server)
              .put('/allergens/123')
              .send({
                name: 'Nouveau nom',
              })
              .end(function(error, response) {
                response.should.have.status(400);
                response.should.be.json;
                done();
              });
          });
      });
    });
  });

  describe('/PUT allergen', () => {
    it('it should PUT one allergen with empty data', function(done) {
      const allergen = new Allergen({
        name: 'Nom test put one with empty data',
      });
      allergen.save().then((result) => {
        chai
          .request(server)
          .get('/allergens/' + result.id)
          .end(function(err, res) {
            chai
              .request(server)
              .put('/allergens/' + result.id)
              .send({})
              .end(function(error, response) {
                response.should.have.status(500);
                done();
              });
          });
      });
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      mongoose.connection.close(done);
    });
  });
});
