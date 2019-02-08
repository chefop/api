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

  describe('/GET starters', () => {
    it('it should GET all the starters', (done) => {
      chai.request(server)
        .get('/starters')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.an('object');
          done();
        });
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

  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });

});
