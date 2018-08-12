import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import userFixture from '../__fixtures__/user.json';

import app from '..';

const { exec } = require('child_process');


const runMigrations = async () => {
  await new Promise((resolve, reject) => {
    const migrate = exec(
      'sequelize db:migrate',
      { env: process.env },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );

    // Forward stdout+stderr to this process
    migrate.stdout.pipe(process.stdout);
    migrate.stderr.pipe(process.stderr);
  });
};

describe('requests', () => {
  let server;

  beforeAll(async () => {
    jasmine.addMatchers(matchers);
    const port = process.env.PORT || 3000;
    server = app().listen(port, async () => {
      await runMigrations();
      console.log('EEEE');
      console.log(`server listen on port ::${port}`);
    });
  });

  /* beforeEach(async () => {

  }); */

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

  afterAll((done) => {
    server.close();
    done();
  });
});
