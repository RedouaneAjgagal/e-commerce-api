const express = require('express');
const router = express.Router();
const { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct, uploadProductImg } = require('../controllers/productController');
const authorizePermissions = require('../middleware/authorization');
const { authenticateUser } = require('../middleware/authentication');


router.route('/')
    .get(getAllProducts)
    .post(authenticateUser, authorizePermissions('admin'), createProduct);

router.route('/uploadImage')
    .post(authenticateUser, authorizePermissions('admin'), uploadProductImg);

router.route('/:productId')
    .get(getSingleProduct)
    .patch(authenticateUser, authorizePermissions('admin'), updateProduct)
    .delete(authenticateUser, authorizePermissions('admin'), deleteProduct);




module.exports = router;