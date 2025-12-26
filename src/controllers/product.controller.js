const productService = require('../services/product.service');

async function getProduct(req, res) {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);

  } catch (error) {
    console.error('❌ API ERROR:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getProduct };
