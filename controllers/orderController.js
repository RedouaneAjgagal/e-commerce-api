const Order = require('../models/Order');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');


const getAllOrders = async (req, res) => {
    res.status(StatusCodes.OK).json({msg: 'All Orders'});
}

const createOrder = async (req, res) => {
    res.status(StatusCodes.CREATED).json({msg: 'Create a new order'});
}

const getSingleOrder = async (req, res) => {
    res.status(StatusCodes.OK).json({msg: 'Single Order'});
}

const getCurrentUserOrders = async (req, res) => {
    res.status(StatusCodes.OK).json({msg: 'Current user orders'});
}

const updateOrder = async (req, res) => {
    res.status(StatusCodes.OK).json({msg: 'Order updated'});
}


module.exports = {
    getAllOrders,
    createOrder,
    getSingleOrder,
    getCurrentUserOrders,
    updateOrder
}