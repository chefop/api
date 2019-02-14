const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const Baking = require('../api/models/Baking');
const server = require('../app');

const config = require('../config/config');

const should = chai.should();

chai.use(chaiHttp);

describe(`Test on BDD : test. For : Baking`, () => {
  before((done) => {
    mongoose.set('useCreateIndex', true);
    mongoose.connect(`mongodb://localhost:27017/test`, {
      useNewUrlParser: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('/POST baking', () => {
    it('it should POST on baking with data', (done) => {
      const baking = {
        name: 'Nom test with empty data',
      };
      chai
        .request(server)
        .post('/bakings')
        .send(baking)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST baking', () => {
    it('it should POST on baking with empty body', (done) => {
      chai
        .request(server)
        .post('/bakings')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/POST baking', () => {
    it('it should POST on baking with empty data', (done) => {
      const baking = {
        name: '',
      };
      chai
        .request(server)
        .post('/bakings')
        .send(baking)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe('/GET bakings', () => {
    it('it should GET all the bakings', (done) => {
      chai
        .request(server)
        .get('/bakings')
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200);
          res.should.be.an('object');
          done();
        });
    });
  });

  describe('/GET baking', () => {
    it('it should GET one baking', function(done) {
      const baking = new Baking({
        name: 'Nom test get one',
      });
      baking.save().then((result) => {
        chai
          .request(server)
          .get(`/bakings/${result.id}`)
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

  describe('/GET baking', () => {
    it('it should GET one baking with empty id', function(done) {
      const baking = new Baking({
        name: 'Nom test get one with empty id',
      });
      baking.save().then((result) => {
        chai
          .request(server)
          .get('/bakings/123')
          .end(function(err, res) {
            res.should.be.json;
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe('/DELETE baking', () => {
    it('it should DELETE one baking', function(done) {
      const baking = new Baking({
        name: 'Nom test delete one',
      });
      baking.save().then((result) => {
        chai
          .request(server)
          .delete(`/bakings/${result.id}`)
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

  describe('/DELETE baking', () => {
    it('it should DELETE one baking with enpty id', function(done) {
      const baking = new Baking({
        name: 'Nom test delete one',
      });
      baking.save().then((result) => {
        chai
          .request(server)
          .delete('/bakings/123')
          .end(function(err, res) {
            res.should.be.json;
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe('/PUT baking', () => {
    it('it should PUT one baking', function(done) {
      const baking = new Baking({
        name: 'Nom test put one',
      });
      baking.save().then((result) => {
        chai
          .request(server)
          .get(`/bakings/${result.id}`)
          .end(function(err, res) {
            chai
              .request(server)
              .put(`/bakings/${result.id}`)
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

  describe('/PUT baking', () => {
    it('it should PUT one baking with empty id', function(done) {
      const baking = new Baking({
        name: 'Nom test put one',
      });
      baking.save().then((result) => {
        chai
          .request(server)
          .get(`/bakings/${result.id}`)
          .end(function(err, res) {
            chai
              .request(server)
              .put('/bakings/123')
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

  describe('/PUT baking', () => {
    it('it should PUT one baking with empty data', function(done) {
      const baking = new Baking({
        name: 'Nom test put one with empty data',
      });
      baking.save().then((result) => {
        chai
          .request(server)
          .get(`/bakings/${result.id}`)
          .end(function(err, res) {
            chai
              .request(server)
              .put(`/bakings/${result.id}`)
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
