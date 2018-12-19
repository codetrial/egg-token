'use strict';

exports.middleware = [ 'token' ];

exports.token = {
  type: 'md5',

  apps: {
    felixpy: {
      secret: 'XnMib79vzwP01gtr',
      expires: 30000,
    },
    codetrial: {
      secret: 'mi9yNGT6zwrqMv8z',
      expires: 30000,
    },
  },
};

exports.keys = 'egg-token';
