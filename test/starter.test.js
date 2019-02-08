const mongoose = require("mongoose");
const Starter = require('../api/models/Starter');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const config = require('../config/config');

let should = chai.should();

chai.use(chaiHttp);

describe(`Test on BDD : ${config.db.name}. For : Starter`, () => {

  before((done) => {
    mongoose.set('useCreateIndex', true)
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('/POST starter', () => {
    it('it should POST on starter with data', (done) => {
      let starter = {
        name: 'Nom test',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
      }
      chai.request(server)
        .post('/starters')
        .send(starter)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST starter', () => {
    it('it should POST on starter with empty data', (done) => {
      let starter = {
        name: "",
      }
      chai.request(server)
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
      chai.request(server)
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
        .then(result => {
          chai.request(server)
            .get('/starters/'+result.id)
            .end(function(err, res){
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
        .then(result => {
          chai.request(server)
            .delete('/starters/'+result.id)
            .end(function(err, res){
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

  describe('/PUT starter', () => {
    it('it should PUT one starter', function(done) {
      const starter = new Starter({
        name: 'Nom test put one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test'
      });
      starter
        .save() 
        .then(result => {
          chai.request(server)
            .get('/starters/'+result.id)
            .end(function(err, res){
              chai.request(server)
                .put('/starters/'+result.id)
                .send({
                    name: 'Nouveau nom',
                    description: 'Nouvelle description',
                    df_price: 2,
                    vat: 4
                  })
                .end(function(error, response){
                  response.should.have.status(200);
                  response.should.be.json;
                  response.body.should.be.a('object');
                  done();
              });
            });
        });
    });
  });

  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });

});