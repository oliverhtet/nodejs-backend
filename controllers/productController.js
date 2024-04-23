const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
      const productData = req.body;
      const newProduct = await Product.create(productData);
      res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  // Controller function to fetch all products
  const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({ success: true, products });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  const getProductById = async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.status(200).json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
// Controller function to filter products
const filterProducts = async (req, res) => {
  try {
    // Extract filter parameters from query string
    const { category, minPrice, maxPrice } = req.query;

    // Construct filter object based on provided parameters
    const filter = {};
    if (category) {
      filter.category = category;
    }
    if (minPrice && maxPrice) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      filter.price = { $gte: minPrice };
    } else if (maxPrice) {
      filter.price = { $lte: maxPrice };
    }

    // Query the database with the constructed filter
    const filteredProducts = await Product.find(filter);

    // Respond with the filtered products
    res.status(200).json({ success: true, products: filteredProducts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createProduct, getAllProducts, getProductById, filterProducts };
