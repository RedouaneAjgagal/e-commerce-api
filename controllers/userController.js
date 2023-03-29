const User = require('../models/User');
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { createTokenUser, attachCookiesToResponse, permissionChecker } = require('../utils');


const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password');
    res.status(StatusCodes.OK).json({ users });
}


const getSingleUser = async (req, res) => {
    const { id } = req.params;
    const accessRoles = ['admin'];
    const user = await permissionChecker(req.user, id, accessRoles);
    res.status(StatusCodes.OK).json({ user });
}


const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });
}


const updateUser = async (req, res) => {
    const { name, email } = req.body;
    if (name && name.trim().length < 3) {
        throw new BadRequestError('Name must be more than 3 characters');
    }
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    if (email && !isValidEmail) {
        throw new BadRequestError(`${email} is not a valid email`);
    }
    const payload = {}
    name ? payload.name = name : null;
    email ? payload.email = email : null;
    const user = await User.findOneAndUpdate({ _id: req.user.id }, payload, { new: true, runValidators: true });
    const userToken = createTokenUser(user);
    attachCookiesToResponse(res, userToken);
    res.status(StatusCodes.OK).json({ user: userToken });
}


const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    if ((!oldPassword || oldPassword.trim().length < 6) || (!newPassword || newPassword.trim().length < 6)) {
        throw new BadRequestError('old and new passwords must be 6 characters and more');
    }
    const { id } = req.user;
    const user = await User.findById(id);
    const isCorrectPassword = await user.comparePassword(oldPassword);
    if (!isCorrectPassword) {
        throw new UnauthenticatedError('Old password is incorrect');
    }
    user.password = newPassword;
    user.save();
    res.status(StatusCodes.OK).json({ msg: 'Success! Password updated.' });
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}