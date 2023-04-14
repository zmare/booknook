const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Book, Bookshelf, List } = require('../db/models');

const { secret, expiresIn } = jwtConfig;


// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};


const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

// If there is no current user, return an error
const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = ['Authentication required'];
    err.status = 401;
    return next(err);
}

// Check if book exists
const doesBookExist = async function (req, _res, next) {
    let book = await Book.findByPk(req.params.bookId);

    if (!book) {
        _res.statusCode = 404;
        _res.json({
            message: "Book couldn't be found",
            statusCode: _res.statusCode
        })
    }

    return next();
}

// Check if bookshelf exists 
const doesBookshelfExist = async function (req, _res, next) {
    let bookshelf = await Bookshelf.findByPk(req.params.bookshelfId);

    if (!bookshelf) {
        _res.statusCode = 404;
        _res.json({
            message: "Bookshelf couldn't be found",
            statusCode: _res.statusCode
        })
    }

    return next();
}

// Check if list exists 
const doesListExist = async function (req, _res, next) {
    let list = await List.findByPk(req.params.listId);

    if (!list) {
        _res.statusCode = 404;
        _res.json({
            message: "Bookshelf couldn't be found",
            statusCode: _res.statusCode
        })
    }

    return next();
}


module.exports = {
    setTokenCookie,
    restoreUser,
    requireAuth,
    doesBookExist,
    doesBookshelfExist,
    doesListExist
};
