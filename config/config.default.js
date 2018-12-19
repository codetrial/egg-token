'use strict';

/**
 * egg-token default config
 * @member Config#token
 * @property {String} type - encryption algorithm
 * @property {Object} apps - authorized applications
 */
exports.token = {
  type: 'md5',

  apps: {},
};
