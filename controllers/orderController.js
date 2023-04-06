const Order = require('../models/Order');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');
const permissionChecker = require('../utils/permissionChecker');

const fakeStripAPI = ({ amount, currency }) => {
    const client_secret = 'SomeRandomSecret';
    return { client_secret, amount }
}


const getAllOrders = async (req, res) => {
    const orders = await Order.find({});
    res.status(StatusCodes.OK).json(orders);
}

const createOrder = async (req, res) => {
    const { items: cartItems, tax, shippingFee } = req.body;
    if (!cartItems || cartItems.length < 1) {
        throw new BadRequestError('Cart is empty');
    }
    if (!tax || !shippingFee) {
        throw new BadRequestError('Please provide tax and shipping fee');
    }
    let orderItems = [];
    let subTotal = 0;
    for (const cartItem of cartItems) {
        const dbProduct = await Product.findById(cartItem.product);
        if (!dbProduct) {
            throw new NotFoundError(`Found no product with id ${cartItem.product}`);
        }
        const { name, price, image, _id } = dbProduct;
        const singleOrderItem = {
            product: _id,
            name,
            image,
            price,
            amount: cartItem.amount
        }
        orderItems = [...orderItems, singleOrderItem];
        subTotal += cartItem.amount * price
    }
    const total = subTotal + Number(tax) + Number(shippingFee);
    const paymentIntent = fakeStripAPI({
        amount: total,
        currency: 'usd'
    });
    const order = await Order.create({
        tax,
        shippingFee,
        subTotal,
        total,
        orderItems,
        user: req.user.id,
        clientSecret: paymentIntent.client_secret
    })
    res.status(StatusCodes.CREATED).json(order);
}

const getSingleOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        throw new NotFoundError(`Found no order with id ${req.params.id}`)
    }
    await permissionChecker(order.user, req.user, ["admin"]);
    res.status(StatusCodes.OK).json(order);
}

const getCurrentUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.id });
    res.status(StatusCodes.OK).json(orders);
}

const updateOrder = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'Order updated' });
}


module.exports = {
    getAllOrders,
    createOrder,
    getSingleOrder,
    getCurrentUserOrders,
    updateOrder
}