const express = require('express');
const sequelize = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, User, Request } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// ************************************ GET routes ************************************ // 

/// GET REQUESTS FOR CURRENT USER 
router.get('/current', requireAuth, async (req, res) => {
    let userId = req.user.id;

    let requests = await Request.findAll({
        where: {
            receiverId: userId
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

    let Requests = [];
    for (let request of requests) {
        Requests.push(request.toJSON());
    };

    res.json(Requests);
})

// // GET REVIEW BY REVIEW ID 
// router.get('/:reviewId', requireAuth, async (req, res) => {
//     //check if review exists
//     let reviewPromise = await Review.findByPk(req.params.reviewId);

//     if (!reviewPromise) {
//         res.statusCode = 404;
//         res.json({
//             message: "Review couldn't be found",
//             statusCode: res.statusCode
//         })
//     }

//     //authorization check
//     const review = reviewPromise.toJSON();
//     const owner = review.ownerId;

//     if (owner !== req.user.id) {
//         res.statusCode = 403;
//         res.json({
//             message: 'Forbidden',
//             statusCode: res.statusCode
//         })
//     } else {
//         res.json(reviewPromise);
//     }
// });

// // ************************************ POST routes ************************************ // 
// // CREATE FRIEND REQUEST 
router.post('/:friendId', requireAuth, async (req, res) => {
    let userId = req.user.id;

    const newRequest = await Request.create({
        requestorId: userId,
        receiverId: +req.params.friendId
    })

    res.statusCode = 201;
    res.json(newRequest)

})

// // ************************************ PUT routes ************************************ // 

// // EDIT A REVIEW FOR A BOOK 
// router.put('/:reviewId', requireAuth, async (req, res) => {
//     //check if review exists
//     let reviewPromise = await Review.findByPk(req.params.reviewId);

//     if (!reviewPromise) {
//         res.statusCode = 404;
//         res.json({
//             message: "Review couldn't be found",
//             statusCode: res.statusCode
//         })
//     }

//     //authorization check
//     const review = reviewPromise.toJSON();
//     const owner = review.ownerId;

//     if (owner !== req.user.id) {
//         res.statusCode = 403;
//         res.json({
//             message: 'Forbidden',
//             statusCode: res.statusCode
//         })
//     } else {
//         const { review, stars } = req.body;

//         if (!review) {
//             res.statusCode = 400;
//             res.json({
//                 message: "Validation Error",
//                 statusCode: res.statusCode,
//                 error: "Review text is required"
//             });
//         } else if (!stars || Number.isInteger(stars) === false || stars < 1 || stars > 5) {
//             res.statusCode = 400;
//             res.json({
//                 message: "Validation Error",
//                 statusCode: res.statusCode,
//                 error: "Stars must be an integer from 1 to 5"
//             });
//         } else {
//             reviewPromise.update({
//                 review: review,
//                 stars: stars
//             });

//             res.json(reviewPromise);
//         }
//     }
// });


// // ************************************ DELETE routes ************************************ // 

// // DELETE A FRIEND REQUEST
router.delete('/:requestId', requireAuth, async (req, res) => {
    //check if review exists
    let requestPromise = await Request.findByPk(req.params.requestId);

    if (!requestPromise) {
        res.statusCode = 404;
        res.json({
            message: "Request couldn't be found",
            statusCode: res.statusCode
        })
    }

    //authorization check
    const request = requestPromise.toJSON();
    const owner = request.receiverId;

    if (owner !== req.user.id) {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: res.statusCode
        })
    } else {
        await requestPromise.destroy();

        res.statusCode = 200;
        res.json({
            message: "Successfully deleted",
            statusCode: res.statusCode
        })
    }

})









module.exports = router;
