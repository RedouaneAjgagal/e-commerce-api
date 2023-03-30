const Review = require('../models/Review');
const Product = require('../models/Product');
const { BadRequestError, NotFoundError, UnauthorizedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { permissionChecker } = require('../utils')

const getAllReviews = async (req, res) => {
    const reviews = await Review.find({}).populate({path: 'product', select: 'name company price'});
    res.status(StatusCodes.OK).json(reviews);
}

const singleReview = async (req, res) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        throw new NotFoundError(`Found no review with id ${reviewId}`);
    }
    res.status(StatusCodes.OK).json(review);
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
    const { reviewId } = req.params;
    const { rating, title, comment } = req.body;
    const review = await Review.findById(reviewId);
    if (!review) {
        throw new NotFoundError(`Found no review with id ${reviewId}`);
    }
    const accessRoles = ['admin'];
    await permissionChecker(review.user._id, req.user, accessRoles);
    const updatedReview = {};
    if (rating) updatedReview.rating = rating;
    if (title) updatedReview.title = title;
    if (comment) updatedReview.comment = comment;
    await review.updateOne(updatedReview, { runValidators: true});
    res.status(StatusCodes.OK).json(review);
}

const deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        throw new NotFoundError(`Found no review with id ${reviewId}`);
    }
    const accessRoles = ['admin'];
    await permissionChecker(review.user._id, req.user, accessRoles);
    await review.deleteOne();
    res.status(StatusCodes.OK).json({ msg: `Review ${reviewId} has been deleted successfully` });
}

module.exports = {
    getAllReviews,
    singleReview,
    createReview,
    updateReview,
    deleteReview
}