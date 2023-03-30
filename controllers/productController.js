const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const path = require('path');

const getAllProducts = async (req, res) => {
    const products = await Product.find({}).populate({path: 'user', select: 'name'});
    res.status(StatusCodes.OK).json(products);
}

const getSingleProduct = async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
        throw new NotFoundError(`No product with id ${productId}`);
    }
    res.status(StatusCodes.OK).json(product);
}

const createProduct = async (req, res) => {
    const userId = req.user.id;
    req.body.user = userId;
    const newProduct = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product: newProduct });
}

const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findOneAndUpdate({ _id: productId }, req.body, { new: true, runValidators: true, strictQuery: true });
    if (!product) {
        throw new NotFoundError(`No product with id ${productId}`);
    }
    res.status(StatusCodes.OK).json(product);
}

const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
        throw new NotFoundError(`No product with id ${productId}`);
    }
    await product.deleteOne();
    res.status(StatusCodes.OK).json({ msg: `Product ${productId}, has been removed successfully!` });
}

const uploadProductImg = async (req, res) => {
    const { image: productImg } = req.files;
    if (!productImg.mimetype.startsWith('image')) {
        throw new BadRequestError('Only images are supported.');
    }
    const maxImgSize = 1024 * 1024;
    if (productImg.size > maxImgSize) {
        throw new BadRequestError('Image size cannot be larger than 1MB');
    }
    const imgPath = path.join(__dirname, '../public/uploads/', productImg.name);
    await productImg.mv(imgPath);
    res.status(StatusCodes.OK).json({ img: `uploads/${productImg.name}` });
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImg
}