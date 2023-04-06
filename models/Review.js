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

reviewSchema.statics.getAvgRating = async function (productId) {
    const [result] = await this.aggregate([
        { $match: { product: productId } },
        {
            $group: {
                _id: null,
                avgRating: { $avg: "$rating" },
                numOfReviews: { $sum: 1 }
            }
        }
    ]);
    await this.model('Product').findOneAndUpdate(
        { _id: productId },
        {
            avgRating: Math.ceil(result?.avgRating || 0),
            numOfReviews: result?.numOfReviews || 0
        }
    );
    console.log(result);
}

reviewSchema.post(['updateOne', 'deleteOne', 'save'], { document: true }, async function () {
    await this.constructor.getAvgRating(this.product);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;