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

/// GET REQUESTS SENT BY CURRENT USER 
router.get('/pending', requireAuth, async (req, res) => {
    let userId = req.user.id;

    let requests = await Request.findAll({
        where: {
            requestorId: userId
        }
    })

    let Requests = [];
    for (let request of requests) {
        Requests.push(request.toJSON());
    };

    for (let request of Requests) {
        let user = await User.findByPk(request.receiverId)

        if (user) {
            user = await user.toJSON();
            request.User = user;
        }
    }
    res.json(Requests);
})

// ************************************ POST routes ************************************ // 

/// CREATE FRIEND REQUEST 

// THIS ROUTE IS ONLY TO CREATE MORE TEST DATA...DO NOT USE ON FRONTEND 
router.post('/testingData', requireAuth, async (req, res) => {
    const { requestorId, receiverId } = req.body;

    const newRequest = await Request.create({
        requestorId: +requestorId,
        receiverId: +receiverId
    })

    res.statusCode = 201;
    res.json(newRequest)

})


router.post('/:friendId', requireAuth, async (req, res) => {
    let userId = req.user.id;

    const newRequest = await Request.create({
        requestorId: userId,
        receiverId: +req.params.friendId
    })

    res.statusCode = 201;
    res.json(newRequest)

})


// ************************************ DELETE routes ************************************ // 

/// DELETE A FRIEND REQUEST
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

    if (request.receiverId !== req.user.id && request.requestorId !== req.user.id) {
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
