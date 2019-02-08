const mongoose = require("mongoose");
const Dessert = require('../api/models/Dessert');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const config = require('../config/config');

let should = chai.should();

chai.use(chaiHttp);

describe(`Test on BDD : ${config.db.name}. For : Dessert`, () => {

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

  describe('/POST dessert', () => {
    it('it should POST on dessert with data', (done) => {
      let dessert = {
        name: 'Nom test',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
      }
      chai.request(server)
        .post('/desserts')
        .send(dessert)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST dessert', () => {
    it('it should POST on dessert with empty data', (done) => {
      let dessert = {
        name: "",
      }
      chai.request(server)
        .post('/desserts')
        .send(dessert)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe('/GET desserts', () => {
    it('it should GET all the desserts', (done) => {
      chai.request(server)
        .get('/desserts')
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200);
          res.should.be.an('object');
          done();
        });
    });
  });

  describe('/GET dessert', () => {
    it('it should GET one dessert', function(done) {
      const dessert = new Dessert({
        name: 'Nom test get one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
      });
      dessert
        .save() // Save starter
        .then(result => {
          chai.request(server)
            .get('/desserts/'+result.id)
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

  describe('/DELETE dessert', () => {
    it('it should DELETE one dessert', function(done) {
      const dessert = new Dessert({
        name: 'Nom test delete one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
      });
      dessert
        .save()
        .then(result => {
          chai.request(server)
            .delete('/desserts/'+result.id)
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

  describe('/PUT dessert', () => {
    it('it should PUT one dessert', function(done) {
      const dessert = new Dessert({
        name: 'Nom test put one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
      });
      dessert
        .save()
        .then(result => {
          chai.request(server)
            .get('/desserts/'+result.id)
            .end(function(err, res){
              chai.request(server)
                .put('/desserts/'+result.id)
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