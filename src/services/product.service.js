const db = require('../config/db');
const cache = require('../config/cache');

const CACHE_TTL = 60;

function getProductById(productId) {
  const cacheKey = `product_${productId}`;

  return new Promise((resolve, reject) => {

    cache.get(cacheKey, (err, cachedData) => {

      if (cachedData) {
        console.log('✅ From Memcached');
        return resolve(JSON.parse(cachedData));
      }

      if (err) {
        console.error('⚠️ Memcached GET failed:', err.message);
      }

      // ⬇️ move async logic OUTSIDE memcached callback
      db.query(
        'SELECT * FROM products WHERE id = ?',
        [productId]
      )
      .then(([rows]) => {

        if (rows.length === 0) {
          return resolve(null);
        }

        const product = rows[0];

        cache.set(
          cacheKey,
          JSON.stringify(product),
          CACHE_TTL,
          (setErr) => {
            if (setErr) {
              console.error('⚠️ Memcached SET failed:', setErr.message);
            }
          }
        );

        console.log('🐬 From MySQL & cached');
        resolve(product);
      })
      .catch(reject);
    });
  });
}

module.exports = { getProductById };
