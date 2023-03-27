const { UnauthorizedError } = require('../errors');
const User = require('../models/User');

const authorizePermissions = (...roles) => {
    return async (req, res, next) => {
        const { role, id } = req.user;
        if (!roles.includes(role)) {
            throw new UnauthorizedError('Unauthorized to access this route.');
        }
        const user = await User.findOne({ _id: id, role: { "$in": roles } }).select('role');
        if (!user) {
            throw new UnauthorizedError('Unauthorized to access this route.');
        }
        next();
    }
}

module.exports = authorizePermissions;