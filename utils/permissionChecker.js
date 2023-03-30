const { UnauthorizedError } = require('../errors');

const permissionChecker = async (ressourceId, request, accessRoles) => {
    if (ressourceId.toString() === request.id.toString()) {
        return
    };
    if (accessRoles.includes(request.role)) {
        return
    }
    throw new UnauthorizedError('You do not have access to this route.');
}

module.exports = permissionChecker