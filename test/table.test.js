const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const Table = require('../api/models/Table');
const server = require('../app');

const config = require('../config/config');

const should = chai.should();

chai.use(chaiHttp);

describe(`Test on BDD : test. For : Table`, () => {
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

  describe('/POST table', () => {
    it('it should POST on table with data', (done) => {
      const table = {
        name: 'Nom test',
        state: 'available',
        capacity: 2,
      };
      chai
        .request(server)
        .post('/tables')
        .send(table)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST table', () => {
    it('it should POST on table with empty body', (done) => {
      chai
        .request(server)
        .post('/tables')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/POST table', () => {
    it('it should POST on table with empty data', (done) => {
      const table = {
        name: '',
      };
      chai
        .request(server)
        .post('/tables')
        .send(table)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe('/GET tables', () => {
    it('it should GET all the tables', (done) => {
      chai
        .request(server)
        .get('/tables')
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200);
          res.should.be.an('object');
          done();
        });
    });
  });

  describe('/GET table', () => {
    it('it should GET one table', function(done) {
      const table = new Table({
        name: 'Nom test get one',
        state: 'available',
        capacity: 2,
      });
      table
        .save() // Save table
        .then((result) => {
          chai
            .request(server)
            .get(`/tables/${result.id}`)
            .end(function(err, res) {
              res.should.be.json;
              res.should.have.status(200);
              res.should.be.an('object');
              result.should.have.property('name');
              result.should.have.property('state');
              result.should.have.property('capacity');
              done();
            });
        });
    });
  });

  describe('/GET table', () => {
    it('it should GET one table with empty id', function(done) {
      const table = new Table({
        name: 'Nom test get one',
        state: 'available',
        capacity: 2,
      });
      table
        .save() // Save table
        .then((result) => {
          chai
            .request(server)
            .get('/tables/123')
            .end(function(err, res) {
              res.should.be.json;
              res.should.have.status(400);
              done();
            });
        });
    });
  });

  describe('/DELETE table', () => {
    it('it should DELETE one table', function(done) {
      const table = new Table({
        name: 'Nom test delete one',
        state: 'available',
        capacity: 2,
      });
      table
        .save() // Save table
        .then((result) => {
          chai
            .request(server)
            .delete(`/tables/${result.id}`)
            .end(function(err, res) {
              res.should.be.json;
              res.should.have.status(200);
              res.should.be.an('object');
              result.should.have.property('name');
              result.should.have.property('state');
              result.should.have.property('capacity');
              done();
            });
        });
    });
  });

  describe('/DELETE table', () => {
    it('it should DELETE one table with enpty id', function(done) {
      const table = new Table({
        name: 'Nom test delete one',
        state: 'available',
        capacity: 2,
      });
      table
        .save() // Save table
        .then((result) => {
          chai
            .request(server)
            .delete('/tables/123')
            .end(function(err, res) {
              res.should.be.json;
              res.should.have.status(400);
              done();
            });
        });
    });
  });

  describe('/PUT table', () => {
    it('it should PUT one table', function(done) {
      const table = new Table({
        name: 'Nom test put one',
        state: 'available',
        capacity: 2,
      });
      table.save().then((result) => {
        chai
          .request(server)
          .get('/tables/' + result.id)
          .end(function(err, res) {
            chai
              .request(server)
              .put('/tables/' + result.id)
              .send({
                name: 'Nouveau nom',
                state: 'occupied',
                capacity: 4,
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

  describe('/PUT table', () => {
    it('it should PUT one table with empty id', function(done) {
      const table = new Table({
        name: 'Nom test put one',
        state: 'available',
        capacity: 2,
      });
      table.save().then((result) => {
        chai
          .request(server)
          .get('/tables/' + result.id)
          .end(function(err, res) {
            chai
              .request(server)
              .put('/tables/123')
              .send({
                name: 'Nouveau nom',
                state: 'occupied',
                capacity: 4,
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

  describe('/PUT table', () => {
    it('it should PUT one table with empty data', function(done) {
      const table = new Table({
        name: 'Nom test put one',
        state: 'available',
        capacity: 2,
      });
      table.save().then((result) => {
        chai
          .request(server)
          .get('/tables/' + result.id)
          .end(function(err, res) {
            chai
              .request(server)
              .put('/tables/' + result.id)
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
