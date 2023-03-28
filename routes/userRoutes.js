const express = require('express');
const router = express.Router();

// Middlewares
const { authenticateUser } = require('../middleware/authentication');
const authorizePermissions = require('../middleware/authorization');

// Routes
const { getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword } = require('../controllers/userController');

router.route('/')
    .get(authenticateUser, authorizePermissions('admin'), getAllUsers);

router.route('/showMe')
    .get(authenticateUser, showCurrentUser);

router.route('/updateUser')
    .patch(updateUser);

router.route('/updateUserPassword')
    .patch(authenticateUser, updateUserPassword);

router.route('/:id')
    .get(authenticateUser, getSingleUser);


module.exports = router