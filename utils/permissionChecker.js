const { UnauthorizedError, NotFoundError } = require('../errors');
const User = require('../models/User');

const permissionChecker = async (requestUser, ressourceUserId, accessRoles) => {
    const user = await User.findById(ressourceUserId).select('-password');
    if (!user) {
        throw new NotFoundError(`There is no user with id ${id}..`);
    }
    if (user._id.toString() !== requestUser.id.toString() && !accessRoles.includes(requestUser.role)) {
        throw new UnauthorizedError('You do not have access to this route.');
    };
    return user
}

module.exports = permissionChecker