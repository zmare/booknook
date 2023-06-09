const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

//simple random number generator
const rNum = (num) => Math.floor(Math.random() * Math.floor(num) + 1)

const seedUsers = (num) => {
    let users = new Array(num).fill('');

    for (const i in users) {
        users[i] = {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            hashedPassword: bcrypt.hashSync(faker.internet.password())
        }
    }

    return users;
}

const seedBooks = (num) => {
    let books = new Array(num).fill('');

    for (const i in books) {
        books[i] = {
            author: faker.name.fullName(),
            title: faker.lorem.sentence(),
            ISBN: (faker.datatype.number({ min: 1111111111111, max: 9999999999999 })).toString(),
            summary: faker.lorem.paragraph(rNum(10)),
            bookImage: faker.image.abstract(640, 480, true)
        }
    }

    return books;
}

const seedBookshelves = (num) => {
    let bookshelves = new Array(num).fill('');

    bookshelves[0] = {
        ownerId: 21,
        name: "Read"
    }

    bookshelves[1] = {
        ownerId: 21,
        name: "Currently Reading"
    }

    bookshelves[2] = {
        ownerId: 21,
        name: "Want to Read"
    }

    for (let i = 3; i < bookshelves.length; i++) {
        bookshelves[i] = {
            ownerId: 21,
            name: faker.lorem.words(rNum(5))
        }
    }

    return bookshelves;
}

const seedReviews = (num) => {
    let reviews = new Array(num).fill('');

    for (const i in reviews) {
        reviews[i] = {
            ownerId: rNum(21),
            bookId: rNum(20),
            review: faker.lorem.paragraph(rNum(3)),
            stars: rNum(5)
        }
    }

    return reviews;
}

const seedBooksBookshelves = (num) => {
    let booksBookshelves = new Array(num).fill('');

    for (const i in booksBookshelves) {
        booksBookshelves[i] = {
            bookId: rNum(20),
            bookshelfId: rNum(5)
        }
    }

    return booksBookshelves;
}

const seedRequests = (num) => {
    let requests = new Array(num).fill('');

    for (const i in requests) {
        requests[i] = {
            requestorId: rNum(20),
            receiverId: 21
        }
    }

    return requests;
}

const seedFriends = (num) => {
    let friends = new Array(num).fill('');

    for (const i in friends) {
        friends[i] = {
            userId: 21,
            friendId: rNum(20)
        }
    }

    return friends;
}

const seedBooksLists = (num) => {
    let booksLists = new Array(num).fill('');

    for (const i in booksLists) {
        booksLists[i] = {
            bookId: rNum(20),
            listId: rNum(3)
        }
    }

    return booksLists;
}

module.exports = {
    seedUsers,
    seedBooks,
    seedBookshelves,
    seedReviews,
    seedBooksBookshelves,
    seedRequests,
    seedFriends,
    seedBooksLists
}
