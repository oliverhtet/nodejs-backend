const express = require('express');

const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const productController = require('../controllers/productController');

// Route to create a new product
router.post('/products', verifyToken,productController.createProduct);

// Route to fetch all products
router.get('/products',productController.getAllProducts);

// Route to fetch a single product by ID
router.get('/products/:productId', productController.getProductById);

// Route to filter products
router.get('/products/filter', productController.filterProducts);

module.exports = router;
