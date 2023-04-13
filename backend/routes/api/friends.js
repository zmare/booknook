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

// ************************************ POST routes ************************************ // 
/// CREATE ADD FRIEND
router.post('/:requestorId', requireAuth, async (req, res) => {
    const { requestId, requestorId, receiverId } = req.body;

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

        const newFriend2 = await Friend.create({
            userId: requestorId,
            friendId: receiverId
        })

        let requestPromise = await Request.findByPk(requestId);
        await requestPromise.destroy()

        res.statusCode = 200;
        res.json(newFriend);
    }

})

// // ************************************ PUT routes ************************************ // 


// // ************************************ DELETE routes ************************************ // 

// // DELETE A FRIEND
router.delete('/delete', requireAuth, async (req, res) => {
    //check if friend exists
    const { userId, friendId } = req.body;

    let friendPromise1 = await Friend.findOne({
        where: {
            userId: userId,
            friendId: friendId
        }
    });

    let friendPromise2 = await Friend.findOne({
        where: {
            userId: friendId,
            friendId: userId,
        }
    });

    if (!friendPromise1) {
        res.statusCode = 404;
        res.json({
            message: "Friend couldn't be found",
            statusCode: res.statusCode
        })
    }

    //authorization check
    const friendship1 = friendPromise1.toJSON();
    const friendship2 = friendPromise2.toJSON();
    const owner = friendship1.userId;
    const receiver = friendship2.friendId;

    if (owner !== req.user.id || receiver !== req.user.id) {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: res.statusCode
        })
    } else {
        await friendPromise1.destroy();
        await friendPromise2.destroy();

        res.statusCode = 200;
        res.json({
            message: "Successfully deleted",
            statusCode: res.statusCode
        })
    }

})


module.exports = router;
