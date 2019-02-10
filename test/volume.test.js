const mongoose = require("mongoose");
const Volume = require('../api/models/Volume');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const config = require('../config/config');

let should = chai.should();

chai.use(chaiHttp);

describe(`Test on BDD : test. For : Volume`, () => {

  before((done) => {
    mongoose.set('useCreateIndex', true)
    mongoose.connect(`mongodb://localhost:27017/test`, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('/POST Volumes', () => {
    it('it should POST on Volumes with data', (done) => {
      let Volumes = {
        name: 'Nom test with empty data',
      }
      chai.request(server)
        .post('/Volumes')
        .send(Volumes)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST Volumes', () => {
    it('it should POST on Volumes with empty body', (done) => {
      chai.request(server)
        .post('/Volumes')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/POST Volumes', () => {
    it('it should POST on Volumes with empty data', (done) => {
      let Volumes = {
        name: "",
      }
      chai.request(server)
        .post('/Volumes')
        .send(Volumes)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe('/GET Volumes', () => {
    it('it should GET all the Volumes', (done) => {
      chai.request(server)
        .get('/Volumes')
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200);
          res.should.be.an('object');
          done();
        });
    });
  });

  describe('/GET Volumes', () => {
    it('it should GET one Volumes', function(done) {
      const Volumes = new Volume({
        name: 'Nom test get one',
      });
      Volumes
        .save()
        .then(result => {
          chai.request(server)
            .get('/Volumes/'+result.id)
            .end(function(err, res){
              res.should.be.json;
              res.should.have.status(200);
              res.should.be.an('object');
              result.should.have.property('name');
              done();
            });
        });
    });
  });

  describe('/GET Volumes', () => {
    it('it should GET one Volumes with empty id', function(done) {
      const Volumes = new Volume({
        name: 'Nom test get one with empty id',
      });
      Volumes
        .save()
        .then(result => {
          chai.request(server)
            .get('/Volumes/123')
            .end(function(err, res){
              res.should.be.json;
              res.should.have.status(400);
              done();
            });
        });
    });
  });

  describe('/DELETE Volumes', () => {
    it('it should DELETE one Volumes', function(done) {
      const Volumes = new Volume({
        name: 'Nom test delete one',
      });
      Volumes
        .save()
        .then(result => {
          chai.request(server)
            .delete('/Volumes/'+result.id)
            .end(function(err, res){
              res.should.be.json;
              res.should.have.status(200);
              res.should.be.an('object');
              result.should.have.property('name');
              done();
            });
        });
    });
  });

  describe('/DELETE Volumes', () => {
    it('it should DELETE one Volumes with enpty id', function(done) {
      const Volumes = new Volume({
        name: 'Nom test delete one',
      });
      Volumes
        .save()
        .then(result => {
          chai.request(server)
            .delete('/Volumes/123')
            .end(function(err, res){
              res.should.be.json;
              res.should.have.status(400);
              done();
            });
        });
    });
  });

  describe('/PUT Volumes', () => {
    it('it should PUT one Volumes', function(done) {
      const Volumes = new Volume({
        name: 'Nom test put one',
      });
      Volumes
        .save()
        .then(result => {
          chai.request(server)
            .get('/Volumes/'+result.id)
            .end(function(err, res){
              chai.request(server)
                .put('/Volumes/'+result.id)
                .send({
                    name: 'Nouveau nom',
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

  describe('/PUT Volumes', () => {
    it('it should PUT one Volumes with empty id', function(done) {
      const Volumes = new Volume({
        name: 'Nom test put one',
      });
      Volumes
        .save()
        .then(result => {
          chai.request(server)
            .get('/Volumes/'+result.id)
            .end(function(err, res){
              chai.request(server)
                .put('/Volumes/123')
                .send({
                    name: 'Nouveau nom',
                  })
                .end(function(error, response){
                  response.should.have.status(400);
                  response.should.be.json;
                  done();
              });
            });
        });
    });
  });

  describe('/PUT Volumes', () => {
    it('it should PUT one Volumes with empty data', function(done) {
      const Volumes = new Volume({
        name: 'Nom test put one with empty data',
      });
      Volumes
        .save()
        .then(result => {
          chai.request(server)
            .get('/Volumes/'+result.id)
            .end(function(err, res){
              chai.request(server)
                .put('/Volumes/'+result.id)
                .send({})
                .end(function(error, response){
                  response.should.have.status(500);
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
