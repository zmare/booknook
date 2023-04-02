const express = require('express');
const { requireAuth, doesBookshelfExist } = require('../../utils/auth');
const { User, Book, Review, Bookshelf, Books_Bookshelves } = require('../../db/models');
const { validateNewBookshelf } = require('../../utils/validation');
const router = express.Router();
const { Op } = require('sequelize')



// ************************************ GET routes ************************************ // 

// GET ALL BOOKSHELVES 
router.get('/', requireAuth, async (req, res, next) => {
    let bookshelvesPromise = await Bookshelf.findAll(
        {
            include: [
                {
                    model: Book,
                    attributes: {
                        exclude: ["Books_Bookshelves"]
                    }
                }
            ]
        }
    )

    // convert returned promise to json 
    let bookshelves = [];
    bookshelvesPromise.forEach(bookshelf => {
        bookshelves.push(bookshelf.toJSON());
    })

    res.json(bookshelves);

})

// GET BOOKSHELVES OF CURRENT USER 
router.get('/current', requireAuth, async (req, res, next) => {
    let userId = req.user.id;

    let bookshelvesPromise = await Bookshelf.findAll(
        {
            where: {
                ownerId: userId
            },
            include: [
                {
                    model: Book,
                    attributes: {
                        exclude: ["Books_Bookshelves"]
                    },
                    include: [
                        {
                            model: Review,
                            attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            }
                        }
                    ]
                }
            ]
        }
    )

    // convert returned promise to json 
    let bookshelves = [];
    bookshelvesPromise.forEach(bookshelf => {
        bookshelves.push(bookshelf.toJSON());
    })

    bookshelves.forEach(bookshelf => {
        let books = bookshelf.Books;

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
            } else {
                book.avgStarRating = "New"
            }

            delete book.Reviews;
            delete book.Books_Bookshelves;
        })

    })

    res.json(bookshelves);

})

// GET BOOKSHELVES BASED ON BOOKSHELF ID 
router.get('/:bookshelfId', [requireAuth, doesBookshelfExist], async (req, res, next) => {
    let userId = req.user.id;

    let bookshelfPromise = await Bookshelf.findByPk(req.params.bookshelfId,
        {
            include: [
                {
                    model: Book,
                    attributes: {
                        exclude: ["Books_Bookshelves"]
                    }
                }
            ]
        }
    )

    // convert returned promise to json 
    let bookshelf = bookshelfPromise.toJSON();

    // convert returned promise to json 
    let books = bookshelf.Books;

    // calculate number of reviews and rating for each book 
    books.forEach(book => {
        let reviews = book.Reviews;

        if (reviews && reviews.length) {
            book.numReviews = reviews.length;

            let sum = 0;
            for (let review of reviews) {
                sum += review.stars;
            }

            let avg = sum / reviews.length;
            let avgRounded = Math.round(avg * 10) / 10;
            book.avgStarRating = avgRounded.toFixed(2);
        }

        delete book.Reviews;
        delete book.Books_Bookshelves;
    })


    res.json(bookshelf);

})


// ************************************ POST routes ************************************ // 

// CREATE A NEW BOOKSHELF 
router.post('/', [requireAuth, validateNewBookshelf], async (req, res, next) => {
    const { name, user } = req.body;
    let userId = user.id;

    const existingBookshelf = await Bookshelf.findOne({
        where: {
            name: name,
            ownerId: userId
        }
    })

    if (!existingBookshelf) {
        const newBookshelf = await Bookshelf.create({
            ownerId: req.user.id,
            name: name
        })
        res.statusCode = 201;
        res.json(newBookshelf)
    } else {
        res.json({
            message: 'Bookshelf already exists',
        })
    }
})

// ADD A BOOK TO BOOKSHELF 
router.post('/add', requireAuth, async (req, res, next) => {
    let userId = req.user.id;
    const { bookId, bookshelfId } = req.body;

    Books_Bookshelves.create({
        bookId: bookId,
        bookshelfId: bookshelfId
    })

    res.json("successfully added")
})


// ************************************ PUT routes ************************************ // 

// EDIT AN EXISTING BOOKSHELF
router.put('/:bookshelfId', [requireAuth, doesBookshelfExist, validateNewBookshelf], async (req, res) => {
    //let userId = req.user.id;
    const { name } = req.body

    const bookshelf = await Bookshelf.findByPk(req.params.bookshelfId);

    bookshelf.update({
        name: name
    });

    res.json(bookshelf);

})

// ************************************ DELETE routes ************************************ // 
router.delete('/delete', requireAuth, async (req, res, next) => {
    //let userId = req.user.id;

    const { bookId, bookshelfId } = req.body;

    const book_bookshelf = await Books_Bookshelves.findOne({
        where: {
            bookId: bookId,
            bookshelfId: bookshelfId
        }
    })

    await book_bookshelf.destroy();

    res.statusCode = 200;
    res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    })
})


// DELETE AN EXISTING BOOKSHELF
router.delete('/:bookshelfId', [requireAuth, doesBookshelfExist], async (req, res) => {
    //let userId = req.user.id;
    const { name } = req.body

    const bookshelf = await Bookshelf.findByPk(req.params.bookshelfId);
    await bookshelf.destroy();

    res.statusCode = 200;
    res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    })
})



module.exports = router;