const mongoose = require("mongoose");
const MainCourse = require('../api/models/MainCourse');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const config = require('../config/config');

let should = chai.should();

chai.use(chaiHttp);

describe(`Test on BDD : ${config.db.name}. For : MainCourse`, () => {

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

  describe('/POST main course', () => {
    it('it should POST on main course with data', (done) => {
      let mainCourse = {
        name: 'Nom test',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
      }
      chai.request(server)
        .post('/mainCourses')
        .send(mainCourse)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST main course', () => {
    it('it should POST on main course with empty data', (done) => {
      let mainCourse = {
        name: "",
      }
      chai.request(server)
        .post('/mainCourses')
        .send(mainCourse)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe('/GET main courses', () => {
    it('it should GET all the main courses', (done) => {
      chai.request(server)
        .get('/mainCourses')
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200);
          res.should.be.an('object');
          done();
        });
    });
  });

  describe('/GET main course', () => {
    it('it should GET one main course', function(done) {
      const mainCourse = new MainCourse({
        name: 'Nom test get one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
      });
      mainCourse
        .save()
        .then(result => {
          chai.request(server)
            .get('/mainCourses/'+result.id)
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

  describe('/DELETE main course', () => {
    it('it should DELETE one main course', function(done) {
      const mainCourse = new MainCourse({
        name: 'Nom test delete one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
        quantity: 30,
        photo: 'Photo test',
      });
      mainCourse
        .save() // Save starter
        .then(result => {
          chai.request(server)
            .delete('/mainCourses/'+result.id)
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

  describe('/PUT main course', () => {
    it('it should PUT one main course', function(done) {
      const mainCourse = new MainCourse({
        name: 'Nom test put one',
        description: 'Description test',
        df_price: 10,
        vat: 20,
      });
      mainCourse
        .save()
        .then(result => {
          chai.request(server)
            .get('/mainCourses/'+result.id)
            .end(function(err, res){
              chai.request(server)
                .put('/mainCourses/'+result.id)
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