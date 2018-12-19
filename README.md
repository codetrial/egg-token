# egg-token

Egg.js middleware that uses encrypted token to authenticate.

[![License](https://img.shields.io/github/license/codetrial/egg-token.svg)](https://github.com/codetrial/egg-token)
[![Version](https://img.shields.io/npm/v/egg-token.svg)](https://www.npmjs.com/package/egg-token)
[![codecov](https://codecov.io/gh/codetrial/egg-token/branch/develop/graph/badge.svg)](https://codecov.io/gh/codetrial/egg-token)
[![TravisCI](https://travis-ci.org/codetrial/egg-token.svg?branch=develop)](https://travis-ci.org/codetrial/egg-token)

## Install

```bash
npm i egg-token
# or
yarn add egg-token
```

## Usage

```js
// {app_root}/config/plugin.js
exports.token = {
  enable: true,
  package: 'egg-token'
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.middleware = ['token'];

exports.token = {
  type: 'md5',
  secret: 'your-magic-secret-key'
};
```

`type` is the algorithm that can be used to generate hash digests.

See [crypto.createHash](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options) for more detail.

## Example

This is an example of using axios to request an api:

```js
const crypto = require('crypto');
const axios = require('axios');

const hash = crypto.createHash('md5');

const APP_CODE = 'felixpy';
const APP_SECRET = 'your-magic-secret-key';

const ts = Date.now();
const md5Value = hash.update(`${APP_CODE}:${ts}:${APP_SECRET}`).digest('hex');

const token = Buffer.from(`${APP_CODE}:${ts}:${md5Value}`).toString('base64');

axios.get('/url/to/your/egg/service', {
  headers: {
    'egg-api-token': token
  }
});
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 - present, Felix Yang
