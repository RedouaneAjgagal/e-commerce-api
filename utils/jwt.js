const jwt = require('jsonwebtoken');

const createToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
    return token;
}

const verifyToken = (token) => {
    const isValidToken = jwt.verify(token, process.env.JWT_SECRET);
    return isValidToken
}

const attachCookiesToResponse = (res, payload) => {
    const token = createToken(payload);
    const oneDay = 24 * 60 * 60 * 1000;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    });
}

module.exports = {
    createToken,
    verifyToken,
    attachCookiesToResponse
}