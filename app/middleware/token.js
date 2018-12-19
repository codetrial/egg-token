'use strict';

const crypto = require('crypto');

function checkToken(type, { code, ts, auth }, { secret, expires }) {
  const now = Date.now();

  if (now - ts > expires) {
    return false;
  }

  const hash = crypto.createHash(type);

  hash.update(`${code}:${ts}:${secret}`);

  return hash.digest('hex') === auth;
}

module.exports = (options, app) => {
  const { type, apps } = options;

  return async function search(ctx, next) {
    const base64Token = ctx.get('egg-api-token') || '';
    const token = Buffer.from(base64Token, 'base64').toString();
    const [ code, ts, auth ] = token.split(':');

    app.loggers.coreLogger.info(
      '[egg-token] checking api token %s -> %s',
      base64Token,
      token
    );

    if (
      !token ||
      !apps[code] ||
      !checkToken(type, { code, ts, auth }, apps[code])
    ) {
      ctx.throw(401, 'Unauthorized');
    }

    await next();
  };
};
