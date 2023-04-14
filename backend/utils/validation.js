const { query } = require('express');
const { validationResult } = require('express-validator');
const { check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors
            .array()
            .map((error) => `${error.msg}`);

        const err = Error('Bad request.');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request.';
        next(err);
    }
    next();
};

const validateNewBookshelf = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Bookshelf name is required'),
    handleValidationErrors
];

const validateNewList = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('List name is required'),
    handleValidationErrors
];

module.exports = {
    handleValidationErrors,
    validateNewBookshelf,
    validateNewList
};
