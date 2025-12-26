const Memcached = require('memcached');

const memcached = new Memcached(
  process.env.MEMCACHED_HOST || '127.0.0.1:11211',
  {
    retries: 2,
    retry: 1000,
    remove: false
  }
);

module.exports = memcached;
