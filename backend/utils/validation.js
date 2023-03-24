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

// const validateBooking = [
//     check('startDate')
//         .exists({ checkFalsy: true })
//         .withMessage('startDate is required')
//         .custom((value, { req, next }) => {
//             value = new Date(value.replace(/-/g, '\/')).toDateString();
//             startDate = new Date(value).getTime();

//             endDateVal = new Date(req.body.endDate.replace(/-/g, '\/')).toDateString();
//             endDate = new Date(endDateVal).getTime();

//             console.log(endDate - startDate < 0);

//             if (endDate - startDate < 0) {
//                 throw new Error("endDate cannot be on or before startDate");
//             } else {
//                 return value;
//             }

//         }),
//     check('endDate')
//         .exists()
//         .withMessage('endDate is required'),
//     handleValidationErrors
// ]

// const validateReview = [
//     check('review')
//         .exists({ checkFalsy: true })
//         .withMessage('Review text is required'),
//     check('stars', 'Stars are required')
//         .exists({ checkFalsy: true })
//         .isInt({ min: 1, max: 5 })
//         .withMessage('Stars must be an integer from 1 to 5'),
//     handleValidationErrors
// ]







module.exports = {
    handleValidationErrors,
    validateNewBookshelf,
    // validateBooking,
    // validateReview
};
