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
        default: 'uploads/defaulProduct.jpeg'
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
    averageRating: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;