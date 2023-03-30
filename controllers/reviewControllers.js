const Review = require('../models/Review');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllReviews = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'All reviews' });
}

const singleReview = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'Single review' });
}

const createReview = async (req, res) => {
    res.status(StatusCodes.CREATED).json({ msg: 'create a review' });
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