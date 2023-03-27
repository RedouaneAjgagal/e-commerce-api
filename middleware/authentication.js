const { UnauthenticatedError } = require('../errors');
const { verifyToken } = require('../utils');

const authenticateUser = async (req, res, next) => {
    const { token } = req.signedCookies;
    if (!token) {
        throw new UnauthenticatedError('Invalid Authentication');
    }
    try {
        const { id, name, role } = verifyToken(token);
        req.user = { id, name, role }
        next();
    } catch (error) {
        throw new UnauthenticatedError('Invalid Authentication');
    }
}

module.exports = {
    authenticateUser
}
