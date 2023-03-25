const jwt = require('jsonwebtoken');

const createToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
    return token;
}

const verifyToken = (token) => {
    const isValidToken = jwt.verify(token, process.env.JWT_SECRET);
    return isValidToken
}

module.exports = {
    createToken,
    verifyToken
}