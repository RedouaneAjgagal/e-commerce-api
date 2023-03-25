const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required..'],
        minLength: [3, 'Name must be 3 characters and more'],
        maxLength: [30, 'Name can not be more than 30 characters'],
    },
    email: {
        type: String,
        validate: {
            validator: function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            },
            message: props => `${props.value} is not a valid email`
        },
        required: [true, 'Email is required..']
    },
    password: {
        type: String,
        required: [true, 'Password is required..'],
        minLength: [6, 'Password must be 6 characters and more'],
        maxLength: [22, 'Password can not be more than 22 characters'],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;