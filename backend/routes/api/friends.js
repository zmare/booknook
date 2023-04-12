const express = require('express');
const sequelize = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, User, Request, Friend } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// ************************************ GET routes ************************************ // 

/// GET FRIENDS FOR CURRENT USER 
router.get('/current', requireAuth, async (req, res) => {
    let userId = req.user.id;

    let friends = await Friend.findAll({
        where: {
            userId: userId
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

    let Friends = [];
    for (let friend of friends) {
        Friends.push(friend.toJSON());
    };

    res.json(Friends);
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
// // CREATE ADD FRIEND
router.post('/:friendId', requireAuth, async (req, res) => {
    const { requestorId, receiverId } = req.body;

    //check if friend exists
    let friendPromise = await Friend.findOne({
        where: {
            userId: receiverId,
            friendId: requestorId
        }
    });

    if (friendPromise) {
        res.statusCode = 404;
        res.json({
            message: "Already friends with this user",
            statusCode: res.statusCode
        })
    }


    //maybe add validation here that the person creating the friend is the receiver of the request! 
    if (receiverId !== req.user.id) {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: res.statusCode
        })
    } else {
        const newFriend = await Friend.create({
            userId: receiverId,
            friendId: requestorId
        })

        res.statusCode = 200;
        res.json(newFriend)
    }

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

// // DELETE A FRIEND
router.delete('/:friendshipId', requireAuth, async (req, res) => {
    //check if friend exists
    let friendPromise = await Friend.findByPk(req.params.friendshipId);

    if (!friendPromise) {
        res.statusCode = 404;
        res.json({
            message: "Friend couldn't be found",
            statusCode: res.statusCode
        })
    }

    //authorization check
    const friend = friendPromise.toJSON();
    const owner = friend.userId;

    if (owner !== req.user.id) {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: res.statusCode
        })
    } else {
        await friendPromise.destroy();

        res.statusCode = 200;
        res.json({
            message: "Successfully deleted",
            statusCode: res.statusCode
        })
    }

})


module.exports = router;
