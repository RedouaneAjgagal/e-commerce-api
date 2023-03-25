const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { createToken } = require('../utils')
const User = require('../models/User');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if ((!name || name.trim().length < 1) || (!email || email.trim().length < 1) || (!password || password.trim().length < 1)) {
        throw new BadRequestError('Please provide valid values')
    }
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
        throw new BadRequestError('Email already exist, please choose another one.');
    }
    const newUser = await User.create({ name, email, password });
    const tokenUser = { id: newUser._id, name: newUser.name, role: newUser.role }
    const token = createToken(tokenUser)
    res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
}

const login = async (req, res) => {
    res.send('login')
}

const logout = async (req, res) => {
    res.send('logout')
}


module.exports = {
    register,
    login,
    logout
}