const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllProducts = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'get all procucts' });
}

const getSingleProduct = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'get single procucts' });
}

const createProduct = async (req, res) => {
    const userId = req.user.id;
    req.body.user = userId;
    const newProduct = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({product: newProduct});
}

const updateProduct = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'update procuct' });
}

const deleteProduct = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'delete product' });
}

const uploadProductImg = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'upload product image' });
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImg
}