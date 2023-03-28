const { UnauthorizedError, NotFoundError } = require('../errors');
const User = require('../models/User');

const permissionChecker = async (requestUser, ressourceUserId) => {
    const user = await User.findById(ressourceUserId).select('-password');
    if (!user) {
        throw new NotFoundError(`There is no user with id ${id}..`);
    }
    const roles = ['admin'];
    if (user._id.toString() !== requestUser.id.toString() && !roles.includes(requestUser.role)) {
        throw new UnauthorizedError('You do not have access to this route.');
    };
    return user
}

module.exports = permissionChecker