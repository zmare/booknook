const express = require('express');
const { requireAuth, doesListExist, doesBookshelfExist } = require('../../utils/auth');
const { User, Book, Review, Bookshelf, Books_Bookshelves, List, Books_Lists } = require('../../db/models');
const { validateNewBookshelf, validateNewList } = require('../../utils/validation');
const router = express.Router();
const { Op } = require('sequelize')



// ************************************ GET routes ************************************ // 

// GET ALL LISTS
router.get('/', requireAuth, async (req, res, next) => {
    let listPromise = await List.findAll(
        {
            include: [
                {
                    model: Book,
                    attributes: {
                        exclude: ["Books_Lists"]
                    }
                },
                {
                    model: User
                }
            ]
        }
    )

    // convert returned promise to json 
    let lists = [];
    listPromise.forEach(list => {
        list = list.toJSON();
        let books = list.Books;

        for (let book of books) {
            delete book.Books_Lists;
        }

        lists.push(list);
    })

    res.json(lists);

})

// GET ALL LISTS OF USER
router.get('/current', requireAuth, async (req, res, next) => {
    let listPromise = await List.findAll(
        {
            where: {
                ownerId: req.user.id
            },
            include: [
                {
                    model: Book,
                    attributes: {
                        exclude: ["Books_Lists"]
                    }
                },
                {
                    model: User
                }
            ]
        }
    )

    // convert returned promise to json 
    let lists = [];
    listPromise.forEach(list => {
        list = list.toJSON();
        let books = list.Books;

        for (let book of books) {
            delete book.Books_Lists;
        }

        lists.push(list);
    })

    res.json(lists);

})

// GET LIST BASED ON LIST ID 
router.get('/:listId', [requireAuth, doesListExist], async (req, res, next) => {
    let userId = req.user.id;

    let listPromise = await List.findByPk(req.params.listId,
        {
            include: [
                {
                    model: Book,
                    attributes: {
                        exclude: ["Books_Lists"]
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
    let list = listPromise.toJSON();

    // convert returned promise to json 
    let books = list.Books;

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
        delete book.Books_Lists;
    })


    res.json(list);

})


// ************************************ POST routes ************************************ // 

// CREATE A NEW LIST 
router.post('/', [requireAuth, validateNewList], async (req, res, next) => {
    const { name } = req.body;
    let userId = req.user.id;

    const existingList = await List.findOne({
        where: {
            name: name
        }
    })

    if (!existingList) {
        const newList = await List.create({
            ownerId: req.user.id,
            name: name
        })
        res.statusCode = 201;
        res.json(newList)
    } else {
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: "List already exists"
        })
    }
})

// ADD A BOOK TO LIST 
router.post('/add', requireAuth, async (req, res, next) => {
    let userId = req.user.id;
    const { bookId, listId } = req.body;

    Books_Lists.create({
        bookId: bookId,
        listId: listId
    })

    res.json("successfully added")
})


// ************************************ PUT routes ************************************ // 

// // EDIT AN EXISTING BOOKSHELF
// router.put('/:bookshelfId', [requireAuth, doesBookshelfExist, validateNewBookshelf], async (req, res) => {
//     //let userId = req.user.id;
//     const { name } = req.body

//     const bookshelf = await Bookshelf.findByPk(req.params.bookshelfId);

//     bookshelf.update({
//         name: name
//     });

//     res.json(bookshelf);

// })

// ************************************ DELETE routes ************************************ // 

// DELETE BOOK FROM LIST 
router.delete('/delete', requireAuth, async (req, res, next) => {
    const { bookId, listId } = req.body;

    const book_list = await Books_Lists.findOne({
        where: {
            bookId: bookId,
            listId: listId
        }
    })

    await book_list.destroy();

    res.statusCode = 200;
    res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    })
})


// DELETE AN EXISTING LIST
router.delete('/:listId', [requireAuth, doesListExist], async (req, res) => {
    const { name } = req.body

    const list = await List.findByPk(req.params.listId);
    await list.destroy();

    res.statusCode = 200;
    res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    })
})



module.exports = router;