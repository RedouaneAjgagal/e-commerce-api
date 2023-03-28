const createTokenUser = (user) => {
    const tokenUser = { id: user._id, name: user.name, role: user.role }
    return tokenUser
}

module.exports = createTokenUser