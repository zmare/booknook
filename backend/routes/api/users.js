const express = require('express');
const { setTokenCookie } = require('../../utils/auth');
const { User, Bookshelf } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid name'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { name, email, password } = req.body;

        let user = await User.signup({ name, email, password });
        const token = await setTokenCookie(res, user);

        user = user.toJSON();
        user.token = token;

        await Bookshelf.create({
            ownerId: user.id,
            name: "Read"
        })

        await Bookshelf.create({
            ownerId: user.id,
            name: "Currently Reading"
        })

        await Bookshelf.create({
            ownerId: user.id,
            name: "Want to Read"
        })

        return res.json({ user });
    }
);

module.exports = router;
