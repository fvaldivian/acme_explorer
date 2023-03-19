const app = require('../src/app/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { faker } = require('@faker-js/faker');
const massiveLoadTools = require('../massiveLoad/massiveLoadTools');

const { expect } = chai;
chai.use(chaiHttp);

const Actor = require('../api/models/actor.model');
const Sponsorship = require('../api/models/sponsorship.model');
const Trip = require('../api/models/trip.model');
const Application = require('../api/models/application.model');
const Finder = require('../api/models/finder.model');
const DashboardInformation = require('../api/models/dashboard.model');



//Sponsorship Tests

describe('Sponsorship Testing', () => {
  before((done) => {
    Sponsorship.remove({}, (err) => {
      done();
    });
  });

  describe('/GET sponsorship', () => {
    it('Should return an empty array of sponsorships since no sponsorship created yet', done => {
      chai
        .request(app)
        .get('/v1/sponsorships')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.error).to.equal(false);
          expect(res.body.message).to.equal('Sponsorships successfully retrieved.');
          expect(res.body.sponsorships).to.have.lengthOf(0);
          expect('Content-Type', /json/);
          if (err) done(err);
          else done();
        });
    });
  });

  describe('/POST sponsorship', () => {
    it('Should deny access since user is not authenticated', done => {
      chai
        .request(app)
        .post('/v1/sponsorships')
        .end((err, res) => {
          expect(res).to.have.status(401);
          if (err) done(err);
          else done();
        });
    });
  });
});

//Dashboard Tests

describe('Dashboard Information Testing', () => {
    before((done) => {
      DashboardInformation.remove({}, (err) => {
        done();
      });
    });
  
    describe('/GET dashboard information', () => {
      it('Should deny access since user is not authenticated', done => {
        chai
          .request(app)
          .get('/v1/dashboard')
          .end((err, res) => {
            expect(res).to.have.status(401);
            if (err) done(err);
            else done();
          });
      });
    });

    describe('/POST dashboard information', () => {
        it('Should deny access since user is not authenticated', done => {
          chai
            .request(app)
            .post('/v1/dashboard')
            .end((err, res) => {
              expect(res).to.have.status(401);
              if (err) done(err);
              else done();
            });
        });
      });

    describe('/GET/trip info by price', () => {
        it('Should deny access since user is not authenticated', done => {
          chai
            .request(app)
            .get('/v1/dashboard/info-trip-price')
            .end((err, res) => {
              expect(res).to.have.status(401);
              if (err) done(err);
              else done();
            });
        });
      });
  });

//Actor Tests

describe('Actors Testing', () => {
  
  describe('/GET actors', () => {
    it('Should deny access since user is not authenticated.', done => {
      chai
        .request(app)
        .get('/v1/actors')
        .end((err, res) => {

          expect(res).to.have.status(401);
          expect(res.text).to.equal('Token must be present in request header.');

          if (err) done(err);
          else done();

        });
    });
  });

  describe('/POST actors', () => {
    it('Should create explorer actor.', done => {
      chai
        .request(app)
        .post('/v1/actors/explorer')
        .send({
          _id: massiveLoadTools.generateMongoObjectId(),
          name: faker.name.firstName(),
          surname: faker.name.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          isActive: true,
          role: ["EXPLORER"],
          deleted: false
        })
        .end((err, res) => {

          expect(res).to.have.status(201);
          expect('Content-Type', /json/);

          if (err) done(err);
          else done();

        });
    });
  });

  describe('/POST actors', () => {
    it('Should create manager actor.', done => {
      chai
        .request(app)
        .post('/v1/actors/manager')
        .send({
          _id: massiveLoadTools.generateMongoObjectId(),
          name: faker.name.firstName(),
          surname: faker.name.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          phone_number: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          isActive: true,
          role: ["MANAGER"],
          deleted: false
        })
        .end((err, res) => {

          expect(res).to.have.status(201);
          expect('Content-Type', /json/);

          if (err) done(err);
          else done();

        });
    });
  });
});

//Trip Tests

describe('Trips Testing', () => {
  
  describe('/GET trips', () => {
    it('Should return list of trips.', done => {
      chai
        .request(app)
        .get('/v1/trips')
        .end((err, res) => {

          expect(res).to.have.status(200);
          expect('Content-Type', /json/);

          if (err) done(err);
          else done();

        });
    });
  });

  describe('/POST trips', () => {
    it('Should deny access since user is not authenticated.', done => {
      chai
        .request(app)
        .post('/v1/trips')
        .send({
          atributes: "are not important in this test"
        })
        .end((err, res) => {

          expect(res).to.have.status(401);
          expect(res.text).to.equal('Token must be present in request header.');

          if (err) done(err);
          else done();

        });
    });
  });

});

//Application Tests
describe('Application test Testing', () => {
  before((done) => {
    Application.remove({}, (err) => {
      done();
    });
  });

  describe('/GET application', () => {
    it('Should deny access since user is not authenticated', done => {
      chai
        .request(app)
        .get('/v1/applications')
        .end((err, res) => {
          expect(res).to.have.status(401);
          if (err) done(err);
          else done();
        });
    });
  });

  describe('/POST application', () => {
      it('Should deny access since user is not authenticated', done => {
        chai
          .request(app)
          .post('/v1/applications')
          .end((err, res) => {
            expect(res).to.have.status(401);
            if (err) done(err);
            else done();
          });
      });
    });
});

//Finder Tests
describe('Finder test Testing', () => {
  before((done) => {
    Finder.remove({}, (err) => {
      done();
    });
  });

  describe('/POST finder', () => {
      it('Should deny access since user is not authenticated', done => {
        chai
          .request(app)
          .post('/v1/finder')
          .end((err, res) => {
            expect(res).to.have.status(401);
            if (err) done(err);
            else done();
          });
      });
    });
});