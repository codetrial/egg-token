'use strict';

const crypto = require('crypto');
const mock = require('egg-mock');

const createToken = function(code, ts, secret) {
  const hash = crypto.createHash('md5');
  const md5Value = hash.update(`${code}:${ts}:${secret}`).digest('hex');

  return Buffer.from(`${code}:${ts}:${md5Value}`).toString('base64');
};

describe('test/token.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/token-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should return unauthorized without token', () => {
    return app
      .httpRequest()
      .get('/')
      .expect(401);
  });

  it('should return unauthorized with wrong secret', () => {
    const token = createToken('felixpy', Date.now(), 'SomeWrongSecret');

    return app
      .httpRequest()
      .get('/')
      .set('egg-api-token', token)
      .expect(401);
  });

  it('should return unauthorized with wrong application', () => {
    const token = createToken('ypxilef', Date.now(), 'XnMib79vzwP01gtr');

    return app
      .httpRequest()
      .get('/')
      .set('egg-api-token', token)
      .expect(401);
  });

  it('should return unauthorized with wrong timestamp', () => {
    const token = createToken(
      'felixpy',
      Date.now() - 30001,
      'XnMib79vzwP01gtr'
    );

    return app
      .httpRequest()
      .get('/')
      .set('egg-api-token', token)
      .expect(401);
  });

  it('should authorized with valid timestamp', () => {
    const token = createToken(
      'felixpy',
      Date.now() - 20000,
      'XnMib79vzwP01gtr'
    );

    return app
      .httpRequest()
      .get('/')
      .set('egg-api-token', token)
      .expect('hi, token')
      .expect(200);
  });

  it('should authorized with app <felixpy>', () => {
    const token = createToken('felixpy', Date.now(), 'XnMib79vzwP01gtr');

    return app
      .httpRequest()
      .get('/')
      .set('egg-api-token', token)
      .expect('hi, token')
      .expect(200);
  });
});
