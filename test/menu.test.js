const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const Menu = require('../api/models/Menu');
const server = require('../app');

const config = require('../config/config');

const should = chai.should();

chai.use(chaiHttp);

describe(`Test on BDD : test. For : Menu`, () => {
  before((done) => {
    mongoose.set('useCreateIndex', true);
    mongoose.connect(`mongodb://localhost:27017/test`, {
      useNewUrlParser: true,
    });
    const db = mongoose.connection;
    db.once('open', function connected() {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('/POST menu', () => {
    it('it should POST on menu with data', (done) => {
      const menu = {
        name: 'Nom test with empty data',
        description: 'Description test',
        df_price: 10,
        vat: 20,
      };
      chai
        .request(server)
        .post('/menus')
        .send(menu)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST menu', () => {
    it('it should POST on menu with empty body', (done) => {
      chai
        .request(server)
        .post('/menus')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/POST menu', () => {
    it('it should POST on menu with empty data', (done) => {
      const menu = {
        name: '',
      };
      chai
        .request(server)
        .post('/menus')
        .send(menu)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe('/GET menus', () => {
    it('it should GET all the menus', (done) => {
      chai
        .request(server)
        .get('/menus')
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200);
          res.should.be.an('object');
          done();
        });
    });
  });

  describe('/GET menu', () => {
    it('it should GET one menu', function(done) {
      const menu = new Menu({
        name: 'Nom test get one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
      });
      menu.save().then((result) => {
        chai
          .request(server)
          .get(`/menus/${result.id}`)
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

  describe('/GET menu', () => {
    it('it should GET one menu with empty id', function(done) {
      const menu = new Menu({
        name: 'Nom test get one with empty id',
        description: 'Description test',
        df_price: 10,
        vat: 20,
      });
      menu.save().then((result) => {
        chai
          .request(server)
          .get('/menus/123')
          .end(function(err, res) {
            res.should.be.json;
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe('/DELETE menu', () => {
    it('it should DELETE one menu', function(done) {
      const menu = new Menu({
        name: 'Nom test delete one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
      });
      menu.save().then((result) => {
        chai
          .request(server)
          .delete(`/menus/${result.id}`)
          .end(function(err, res) {
            res.should.be.json;
            res.should.have.status(200);
            res.should.be.an('object');
            result.should.have.property('name');
            result.should.have.property('description');
            result.should.have.property('df_price');
            result.should.have.property('vat');
            done();
          });
      });
    });
  });

  describe('/DELETE menu', () => {
    it('it should DELETE one menu with enpty id', function(done) {
      const menu = new Menu({
        name: 'Nom test delete one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
      });
      menu.save().then((result) => {
        chai
          .request(server)
          .delete('/menus/123')
          .end(function(err, res) {
            res.should.be.json;
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe('/PUT menu', () => {
    it('it should PUT one menu', function(done) {
      const menu = new Menu({
        name: 'Nom test put one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
      });
      menu.save().then((result) => {
        chai
          .request(server)
          .get(`/menus/${result.id}`)
          .end(function(err, res) {
            chai
              .request(server)
              .put(`/menus/${result.id}`)
              .send({
                name: 'Nouveau nom',
                description: 'Description test',
                df_price: 10,
                vat: 20,
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

  describe('/PUT menu', () => {
    it('it should PUT one menu with empty id', function(done) {
      const menu = new Menu({
        name: 'Nom test put one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
      });
      menu.save().then((result) => {
        chai
          .request(server)
          .get(`/menus/${result.id}`)
          .end(function(err, res) {
            chai
              .request(server)
              .put('/menus/123')
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

  describe('/PUT menu', () => {
    it('it should PUT one menu with empty data', function(done) {
      const menu = new Menu({
        name: 'Nom test put one with empty data',
        description: 'Description test',
        df_price: 10,
        vat: 20,
      });
      menu.save().then((result) => {
        chai
          .request(server)
          .get(`/menus/${result.id}`)
          .end(function(err, res) {
            chai
              .request(server)
              .put(`/menus/${result.id}`)
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
