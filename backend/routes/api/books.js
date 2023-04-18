const express = require('express');
const { requireAuth, doesBookExist } = require('../../utils/auth');
const { User, Book, Review, Bookshelf, List } = require('../../db/models');
const router = express.Router();
const { Op } = require('sequelize')


// ************************************ GET routes ************************************// 

// GET ALL BOOKS FROM QUERY 
// router.get('/', async (req, res) => {

//     let { author, title, isbn } = req.query;

//     let query = {
//         where: {},
//         include: []
//     }
//     query.include.push({ model: Book }, { model: Review });

//     query.where.author = author; 
//     query.where

//     let bookList = await Book.findAll(query)

//     let Books = [];
//     bookList.forEach(book => {
//         Books.push(book.toJSON());
//     })

//     Books.forEach(book => {
//         let reviews = book.Reviews

//         if (reviews.length) {
//             let sum = 0;
//             for (let review of reviews) {
//                 sum += review.stars;
//             }
//             let avg = sum / reviews.length;
//             let avgRounded = Math.round(avg * 10) / 10
//             spot.avgRating = avgRounded;
//             sum = 0;
//         }

//         if (!reviews.length) {
//             book.avgRating = 'no reviews yet'
//         }

//         delete book.Reviews;

//     })

//     res.json({ Books });
// })


// GET ALL BOOKS 
router.get('/', async (req, res, next) => {
    let booksPromise = await Book.findAll({
        include: [
            {
                model: Review,
                attributes: {
                    exclude: ['bookId', 'createdAt', 'updatedAt']
                }
            }
        ]
    })

    // convert returned promise to json 
    let books = [];
    booksPromise.forEach(book => {
        books.push(book.toJSON());
    })

    // calculate number of reviews and rating for each book 
    books.forEach(book => {
        let reviews = book.Reviews;

        if (reviews.length) {
            book.numReviews = reviews.length;

            let sum = 0;
            for (let review of reviews) {
                sum += review.stars;
            }

            let avg = sum / reviews.length;
            let avgRounded = Math.round(avg * 10) / 10;
            book.avgStarRating = avgRounded.toFixed(2);
        }

    })

    res.json(books);
})

// GET SPECIFIC BOOK BY ID 
router.get('/:bookId', doesBookExist, async (req, res, next) => {
    let bookPromise = await Book.findByPk(req.params.bookId,
        {
            include: [
                {
                    model: Review,
                    attributes: {
                        exclude: ['bookId', 'updatedAt', "ownerId"]
                    },
                    include: [
                        {
                            model: User
                        }
                    ]
                },
                {
                    model: Bookshelf
                },
                {
                    model: List
                }
            ]
        }
    )

    // convert return book data to json 
    let book = bookPromise.toJSON();

    // calculate num of review and avg rating for book 
    let reviews = book.Reviews;
    if (reviews.length) {
        book.numReviews = reviews.length;

        let sum = 0;
        for (let review of reviews) {
            sum += review.stars;
        }

        let avg = sum / reviews.length;
        let avgRounded = Math.round(avg * 10) / 10;
        book.avgStarRating = avgRounded.toFixed(2);
    }

    res.json(book)
})

module.exports = router;
