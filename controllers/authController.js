const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { verifyToken, attachCookiesToResponse } = require('../utils');
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
    attachCookiesToResponse(res, tokenUser);
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('email and password are required');
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('Invalid email or password');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid email or password');
    }
    const tokenUser = { id: user._id, name: user.name, role: user.role }
    attachCookiesToResponse(res, tokenUser)

    res.status(StatusCodes.OK).json({ user: tokenUser });
}

const logout = async (req, res) => {
    const { token } = req.signedCookies;
    const userInfo = verifyToken(token);
    console.log(userInfo, token);
    res.send('logout');
}


module.exports = {
    register,
    login,
    logout
}