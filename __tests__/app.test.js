import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import userFixture from '../__fixtures__/user.json';
import db from '../models/';

import app from '..';

describe('app', () => {
  let server;

  beforeAll(() => {
    jasmine.addMatchers(matchers);
    db.sequelize.sync({ force: true });
    server = app().listen();
  });

  describe('requests', () => {
    it('GET 200', async () => {
      const res = await request.agent(server)
        .get('/');
      expect(res).toHaveHTTPStatus(200);
    });

    it('GET 404', async () => {
      const res = await request.agent(server)
        .get('/wrong-path');
      expect(res).toHaveHTTPStatus(404);
    });
  });

  describe('users crud with session', () => {
    it('GET session', async () => {
      const res = await request.agent(server)
        .get('/session/new');
      expect(res).toHaveHTTPStatus(200);
    });

    it('CREATE user', async () => {
      const res = await request.agent(server)
        .post('/users')
        .send({ form: userFixture });
      expect(res).toHaveHTTPStatus(302);
    });

    it('GET users list', async () => {
      const res = await request.agent(server)
        .get('/users');
      expect(res).toHaveHTTPStatus(200);
    });

    it('CREATE session', async () => {
      const res = await request.agent(server)
        .post('/session')
        .send({ form: userFixture });

      expect(res).toHaveHTTPStatus(302);
    });

    it('UPDATE user', async () => {
      const res = await request.agent(server)
        .post('/session')
        .send({ form: userFixture });

      expect(res).toHaveHTTPStatus(302);
    });

    it('DELETE session', async () => {
      const res = await request.agent(server)
        .delete('/session');

      expect(res).toHaveHTTPStatus(302);
    });
  });

  describe('session', () => {
    it('GET session', async () => {
      const res = await request.agent(server)
        .get('/session/new');
      expect(res).toHaveHTTPStatus(200);
    });

    it('GET users list', async () => {
      const res = await request.agent(server)
        .get('/users');
      expect(res).toHaveHTTPStatus(200);
    });

    it('CREATE session', async () => {
      const res = await request.agent(server)
        .post('/session')
        .send({ form: userFixture });

      expect(res).toHaveHTTPStatus(302);
    });

    it('UPDATE user', async () => {
      const res = await request.agent(server)
        .post('/session')
        .send({ form: userFixture });

      expect(res).toHaveHTTPStatus(302);
    });

    it('DELETE session', async () => {
      const res = await request.agent(server)
        .delete('/session');

      expect(res).toHaveHTTPStatus(302);
    });
  });


  afterAll(() => {
    server.close();
    db.sequelize.drop({ force: true });
  });
});
