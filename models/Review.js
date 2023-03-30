const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please rate the product']
    },
    title: {
        type: String,
        trime: true,
        required: [true, 'Title is required.'],
        maxLength: 50
    },
    comment: {
        type: String,
        trime: true,
        required: [true, 'comment is required.'],
        maxLength: 500
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, { timestamps: true });

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;