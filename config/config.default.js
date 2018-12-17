'use strict';

/**
 * egg-token default config
 * @member Config#token
 * @property {String} type - encryption algorithm
 * @property {String} secret - secret key
 */
exports.token = {
  type: 'md5',
  secret: 'your-magic-secret-key',
};
