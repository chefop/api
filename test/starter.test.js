const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const Starter = require('../api/models/Starter');
const server = require('../app');

const config = require('../config/config');

const should = chai.should();

chai.use(chaiHttp);

describe(`Test on BDD : test. For : Starter`, () => {
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

  describe('/POST starter', () => {
    it('it should POST on starter with data', (done) => {
      const starter = {
        name: 'Nom test',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
      };
      chai
        .request(server)
        .post('/starters')
        .send(starter)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST starter', () => {
    it('it should POST on starter with empty body', (done) => {
      chai
        .request(server)
        .post('/starters')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/POST starter', () => {
    it('it should POST on starter with empty data', (done) => {
      const starter = {
        name: '',
      };
      chai
        .request(server)
        .post('/starters')
        .send(starter)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe('/GET starters', () => {
    it('it should GET all the starters', (done) => {
      chai
        .request(server)
        .get('/starters')
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200);
          res.should.be.an('object');
          done();
        });
    });
  });

  describe('/GET starter', () => {
    it('it should GET one starter', function(done) {
      const starter = new Starter({
        name: 'Nom test get one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
      });
      starter
        .save() // Save starter
        .then((result) => {
          chai
            .request(server)
            .get(`/starters/${result.id}`)
            .end(function(err, res) {
              res.should.be.json;
              res.should.have.status(200);
              res.should.be.an('object');
              result.should.have.property('name');
              result.should.have.property('description');
              result.should.have.property('df_price');
              result.should.have.property('vat');
              result.should.have.property('quantity');
              result.should.have.property('photo');
              done();
            });
        });
    });
  });

  describe('/GET starter', () => {
    it('it should GET one starter with empty id', function(done) {
      const starter = new Starter({
        name: 'Nom test get one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
      });
      starter
        .save() // Save starter
        .then((result) => {
          chai
            .request(server)
            .get('/starters/123')
            .end(function(err, res) {
              res.should.be.json;
              res.should.have.status(400);
              done();
            });
        });
    });
  });

  describe('/DELETE starter', () => {
    it('it should DELETE one starter', function(done) {
      const starter = new Starter({
        name: 'Nom test delete one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
      });
      starter
        .save() // Save starter
        .then((result) => {
          chai
            .request(server)
            .delete(`/starters/${result.id}`)
            .end(function(err, res) {
              res.should.be.json;
              res.should.have.status(200);
              res.should.be.an('object');
              result.should.have.property('name');
              result.should.have.property('description');
              result.should.have.property('df_price');
              result.should.have.property('vat');
              result.should.have.property('quantity');
              result.should.have.property('photo');
              done();
            });
        });
    });
  });

  describe('/DELETE starter', () => {
    it('it should DELETE one starter with enpty id', function(done) {
      const starter = new Starter({
        name: 'Nom test delete one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
      });
      starter
        .save() // Save starter
        .then((result) => {
          chai
            .request(server)
            .delete('/starters/123')
            .end(function(err, res) {
              res.should.be.json;
              res.should.have.status(400);
              done();
            });
        });
    });
  });

  describe('/PUT starter', () => {
    it('it should PUT one starter', function(done) {
      const starter = new Starter({
        name: 'Nom test put one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
      });
      starter.save().then((result) => {
        chai
          .request(server)
          .get('/starters/' + result.id)
          .end(function(err, res) {
            chai
              .request(server)
              .put('/starters/' + result.id)
              .send({
                name: 'Nouveau nom',
                description: 'Nouvelle description',
                df_price: 2,
                vat: 4,
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

  describe('/PUT starter', () => {
    it('it should PUT one starter with empty id', function(done) {
      const starter = new Starter({
        name: 'Nom test put one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
      });
      starter.save().then((result) => {
        chai
          .request(server)
          .get('/starters/' + result.id)
          .end(function(err, res) {
            chai
              .request(server)
              .put('/starters/123')
              .send({
                name: 'Nouveau nom',
                description: 'Nouvelle description',
                df_price: 2,
                vat: 4,
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

  describe('/PUT starter', () => {
    it('it should PUT one starter with empty data', function(done) {
      const starter = new Starter({
        name: 'Nom test put one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
      });
      starter.save().then((result) => {
        chai
          .request(server)
          .get('/starters/' + result.id)
          .end(function(err, res) {
            chai
              .request(server)
              .put('/starters/' + result.id)
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
