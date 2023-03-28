const express = require('express');
const sequelize = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// ************************************ GET routes ************************************ // 

/// GET REVIEWS FOR CURRENT USER 
router.get('/current', requireAuth, async (req, res) => {
    let userId = req.user.id;

    let reviews = await Review.findAll({
        where: {
            ownerId: userId
        },
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['username', 'hashedPassword', 'createdAt', 'updatedAt', 'email']

                }
            }
        ]
    })

    let Reviews = [];
    for (let review of reviews) {
        Reviews.push(review.toJSON());
    };

    res.json(Reviews);
})

// ************************************ POST routes ************************************ // 
// CREATE REVIEW FOR BOOK 
router.post('/:bookId', requireAuth, async (req, res) => {
    const { review, stars } = req.body;

    const newReview = await Review.create({
        ownerId: req.user.id,
        bookId: req.params.bookId,
        review: review,
        stars: stars
    })
    res.statusCode = 201;
    res.json(newReview)

})

// ************************************ PUT routes ************************************ // 

// EDIT A REVIEW FOR A BOOK 
router.put('/:reviewId', requireAuth, async (req, res) => {
    //check if review exists
    let reviewPromise = await Review.findByPk(req.params.reviewId);

    if (!reviewPromise) {
        res.statusCode = 404;
        res.json({
            message: "Review couldn't be found",
            statusCode: res.statusCode
        })
    }

    //authorization check
    const review = reviewPromise.toJSON();
    const owner = review.ownerId;

    if (owner !== req.user.id) {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: res.statusCode
        })
    } else {
        const { review, stars } = req.body;

        if (!review) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: res.statusCode,
                error: "Review text is required"
            });
        } else if (!stars || Number.isInteger(stars) === false || stars < 1 || stars > 5) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: res.statusCode,
                error: "Stars must be an integer from 1 to 5"
            });
        } else {
            reviewPromise.update({
                review: review,
                stars: stars
            });

            res.json(reviewPromise);
        }
    }
});


// ************************************ DELETE routes ************************************ // 

// DELETE A REVIEW
router.delete('/:reviewId', requireAuth, async (req, res) => {
    //check if review exists
    let reviewPromise = await Review.findByPk(req.params.reviewId);

    if (!reviewPromise) {
        res.statusCode = 404;
        res.json({
            message: "Review couldn't be found",
            statusCode: res.statusCode
        })
    }

    //authorization check
    const review = reviewPromise.toJSON();
    const owner = review.ownerId;

    if (owner !== req.user.id) {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: res.statusCode
        })
    } else {
        await reviewPromise.destroy();

        res.statusCode = 200;
        res.json({
            message: "Successfully deleted",
            statusCode: res.statusCode
        })
    }

})









module.exports = router;
