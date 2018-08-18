import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import faker from 'faker';

import db, { User } from '../models/';

import app from '..';

const getUserObject = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.exampleEmail(),
  password: faker.internet.password(),
});

describe('USER CRUD', () => {
  let server;

  beforeAll(async () => {
    jasmine.addMatchers(matchers);
    await db.sequelize.sync({ force: true });
    server = app().listen();
  });

  it('CREATE user', async () => {
    const userData = getUserObject();
    const res = await request.agent(server)
      .post('/users')
      .send({ form: getUserObject() });

    const user = await User.findOne(userData);
    console.log(user.dataValues);
    expect(res).toHaveHTTPStatus(302);
  });

  afterAll(() => {
    server.close();
    db.sequelize.drop({ force: true });
  });
});
