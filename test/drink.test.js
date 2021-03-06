const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const Drink = require('../api/models/Drink');
const server = require('../app');

const config = require('../config/config');

const should = chai.should();

chai.use(chaiHttp);

describe(`Test on BDD : test. For : Drink`, () => {
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

  describe('/POST drink', () => {
    it('it should POST on drink with data', (done) => {
      const drink = {
        name: 'Nom test',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
        alcohol: false,
        cold_drink: false,
      };
      chai
        .request(server)
        .post('/drinks')
        .send(drink)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST drink', () => {
    it('it should POST on drink with empty body', (done) => {
      chai
        .request(server)
        .post('/drinks')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/POST drink', () => {
    it('it should POST on drink with empty data', (done) => {
      const drink = {
        name: '',
      };
      chai
        .request(server)
        .post('/drinks')
        .send(drink)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe('/GET drinks', () => {
    it('it should GET all the drinks', (done) => {
      chai
        .request(server)
        .get('/drinks')
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200);
          res.should.be.an('object');
          done();
        });
    });
  });

  describe('/GET drink', () => {
    it('it should GET one drink', function(done) {
      const drink = new Drink({
        name: 'Nom test get one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
        alcohol: false,
        cold_drink: false,
      });
      drink
        .save() // Save starter
        .then((result) => {
          chai
            .request(server)
            .get(`/drinks/${result.id}`)
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

  describe('/GET drink', () => {
    it('it should GET one drink with empty id', function(done) {
      const drink = new Drink({
        name: 'Nom test get one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
        alcohol: false,
        cold_drink: false,
      });
      drink
        .save() // Save starter
        .then((result) => {
          chai
            .request(server)
            .get('/drinks/123')
            .end(function(err, res) {
              res.should.be.json;
              res.should.have.status(400);
              done();
            });
        });
    });
  });

  describe('/DELETE drink', () => {
    it('it should DELETE one drink', function(done) {
      const drink = new Drink({
        name: 'Nom test delete one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
        alcohol: false,
        cold_drink: false,
      });
      drink.save().then((result) => {
        chai
          .request(server)
          .delete(`/drinks/${result.id}`)
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

  describe('/DELETE drink', () => {
    it('it should DELETE one drink with empty id', function(done) {
      const drink = new Drink({
        name: 'Nom test delete one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
        alcohol: false,
        cold_drink: false,
      });
      drink.save().then((result) => {
        chai
          .request(server)
          .delete('/drinks/123')
          .end(function(err, res) {
            res.should.be.json;
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe('/PUT drink', () => {
    it('it should PUT one drink', function(done) {
      const drink = new Drink({
        name: 'Nouveau nom',
        description: 'Nouvelle description',
        df_price: 10,
        vat: 20,
        alcohol: false,
        cold_drink: false,
      });
      drink.save().then((result) => {
        chai
          .request(server)
          .get(`/drinks/${result.id}`)
          .end(function(err, res) {
            chai
              .request(server)
              .put(`/drinks/${result.id}`)
              .send({
                name: 'Nouveau nom',
                description: 'Nouvelle description',
                df_price: 2,
                vat: 4,
                alcohol: false,
                cold_drink: false,
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

  describe('/PUT drink', () => {
    it('it should PUT one drink with empty id', function(done) {
      const drink = new Drink({
        name: 'Nouveau nom',
        description: 'Nouvelle description',
        df_price: 10,
        vat: 20,
        alcohol: false,
        cold_drink: false,
      });
      drink.save().then((result) => {
        chai
          .request(server)
          .get(`/drinks/${result.id}`)
          .end(function(err, res) {
            chai
              .request(server)
              .put('/drinks/123')
              .send({
                name: 'Nouveau nom',
                description: 'Nouvelle description',
                df_price: 2,
                vat: 4,
                alcohol: false,
                cold_drink: false,
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

  describe('/PUT drink', () => {
    it('it should PUT one drink with empty data', function(done) {
      const drink = new Drink({
        name: 'Nom test put one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        alcohol: false,
        cold_drink: false,
        photo: 'Photo test',
      });
      drink.save().then((result) => {
        chai
          .request(server)
          .get(`/drinks/${result.id}`)
          .end(function(err, res) {
            chai
              .request(server)
              .put(`/drinks/${result.id}`)
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
