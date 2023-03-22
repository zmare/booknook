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
            ISBN: faker.datatype.number({ min: 1111111111111, max: 9999999999999 }).toString(),
            summary: faker.lorem.paragraph(rNum(10)),
            bookImage: faker.image.abstract(640, 480, true)
        }
    }

    return books;
}

const seedBookshelves = (num) => {
    let bookshelves = new Array(num).fill('');

    for (const i in bookshelves) {
        bookshelves[i] = {
            ownerId: 11,
            name: faker.lorem.words(rNum(5))
        }
    }

    return bookshelves;
}

const seedReviews = (num) => {
    let reviews = new Array(num).fill('');

    for (const i in reviews) {
        reviews[i] = {
            ownerId: rNum(11),
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

module.exports = {
    seedUsers,
    seedBooks,
    seedBookshelves,
    seedReviews,
    seedBooksBookshelves
}
