const express = require('express');
const router = express.Router();

const { getAllReviews, singleReview, createReview, updateReview, deleteReview } = require('../controllers/reviewControllers');
const { authenticateUser } = require('../middleware/authentication');

router.route('/')
    .get(getAllReviews)
    .post(authenticateUser, createReview);


router.route('/:reviewId')
    .get(singleReview)
    .patch(authenticateUser, updateReview)
    .delete(authenticateUser, deleteReview);


module.exports = router;