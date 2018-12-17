'use strict';

const crypto = require('crypto');
const mock = require('egg-mock');

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

  it('should GET /', () => {
    const hash = crypto.createHash('md5');
    const code = 'felixpy';
    const ts = new Date().getTime();
    const md5Value = hash
      .update(`${code}:${ts}:XnMib79vzwP01gtr`)
      .digest('hex');

    const token = Buffer.from(`${code}:${ts}:${md5Value}`).toString('base64');

    return app
      .httpRequest()
      .get('/')
      .set('egg-api-token', token)
      .expect('hi, token')
      .expect(200);
  });
});
