const User = require('../models/User');
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password');
    res.status(StatusCodes.OK).json({ users });
}
const getSingleUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id).select('-password');
    if (!user) {
        throw new NotFoundError(`There is no user with id ${id}..`);
    }
    res.status(StatusCodes.OK).json({ user })
}
const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user })
}
const updateUser = async (req, res) => {
    res.status(StatusCodes.OK).json(req.body)
}
const updateUserPassword = async (req, res) => {
    res.status(StatusCodes.OK).json(req.body)
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}