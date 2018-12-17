'use strict';

const crypto = require('crypto');

function checkToken(type, secret, token) {
  const [ code, ts, auth ] = token.split(':');
  const hash = crypto.createHash(type);

  hash.update(`${code}:${ts}:${secret}`);

  return hash.digest('hex') === auth;
}

module.exports = (options, app) => {
  const { type, secret } = options;

  return async function search(ctx, next) {
    const base64Token = ctx.get('egg-api-token') || '';
    const token = Buffer.from(base64Token, 'base64').toString();

    app.loggers.coreLogger.info(
      '[egg-token] checking api token %s -> %s',
      base64Token,
      token
    );

    if (!token || !checkToken(type, secret, token)) {
      ctx.throw(401, 'Unauthorized');
    }

    await next();
  };
};
