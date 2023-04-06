const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required.'],
        maxLength: 50
    },
    price: {
        type: Number,
        required: [true, 'Price is required.']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required.'],
        maxLength: 1000
    },
    image: {
        type: String,
        default: 'uploads/defaultProduct.jpeg'
    },
    category: {
        type: String,
        required: [true, 'Category is required.'],
        enum: {
            values: ['office', 'kitchen', 'bedroom'],
            message: '{VALUE} is not supported'
        }
    },
    company: {
        type: String,
        required: [true, 'Company is required.'],
        enum: {
            values: ['ikea', 'liddy', 'marcos'],
            message: '{VALUE} is not supported'
        }
    },
    colors: {
        type: [String],
        default: ['#222'],
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    inventory: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    avgRating: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

productSchema.virtual('review', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
    justOne: false
});

productSchema.pre('deleteOne', { document: true, query: false }, async function () {
    await this.model('Review').deleteMany({ product: this._id });
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;