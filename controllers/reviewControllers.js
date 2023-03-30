const Review = require('../models/Review');
const Product = require('../models/Product');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllReviews = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'All reviews' });
}

const singleReview = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'Single review' });
}

const createReview = async (req, res) => {
    const { product: productId } = req.body;
    const isValidProduct = await Product.findById(productId);
    if (!isValidProduct) {
        throw new NotFoundError(`No product is exist with id ${productId}`);
    }
    const alreadySubmitted = await Review.findOne({ user: req.user.id, product: productId });
    if (alreadySubmitted) {
        throw new BadRequestError('You have already submitted a review for this product');
    }
    req.body.user = req.user.id
    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json(review);
}

const updateReview = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'update review' });
}

const deleteReview = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'delete review' });
}

module.exports = {
    getAllReviews,
    singleReview,
    createReview,
    updateReview,
    deleteReview
}