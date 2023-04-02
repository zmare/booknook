import { csrfFetch } from './csrf';

// ******************************** CONSTANTS ******************************** // 
const LOAD_BOOKSHELVES = '/bookshelves/load';
const LOAD_BOOKSHELF = '/bookshelves/current';
const ADD_BOOKSHELF = '/bookshelves/add';
const ADD_BOOK = '/bookshelves/add/book';
const EDIT_BOOKSHELF = '/bookshelves/update';
const DELETE_BOOKSHELF = '/bookshelves/delete';
const DELETE_BOOK = 'bookshelves/delete/book';

// ***************************** ACTION CREATORS ***************************** // 
const loadBookshelves = bookshelves => ({
    type: LOAD_BOOKSHELVES,
    bookshelves
})

const loadBookshelf = bookshelf => ({
    type: LOAD_BOOKSHELF,
    bookshelf
})

const addBookshelf = bookshelf => ({
    type: ADD_BOOKSHELF,
    bookshelf
})

const addBookToShelf = () => ({
    type: ADD_BOOK
})
const editBookshelf = bookshelf => ({
    type: EDIT_BOOKSHELF,
    bookshelf
})

const deleteBookshelf = () => ({
    type: DELETE_BOOKSHELF
})

const deleteBook = () => ({
    type: DELETE_BOOK
})

// ********************************* THUNKS ********************************** //
export const getBookshelves = () => async (dispatch) => {
    const response = await csrfFetch("/api/bookshelves/current");

    if (response.ok) {
        const data = await response.json();
        dispatch(loadBookshelves(data));
        return data;
    }
};

export const getBookshelf = (shelfId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookshelves/${shelfId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadBookshelf(data));
        return data;
    }
}

export const createBookshelf = (bookshelf) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookshelves/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookshelf)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addBookshelf(data));
        return data;
    }
}

export const addBook = (bookId, bookshelfId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookshelves/add`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            bookId: bookId,
            bookshelfId: bookshelfId
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addBookToShelf());
        return data;
    }
}

export const updateBookshelf = (bookshelfId, bookshelf) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookshelves/${bookshelfId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookshelf)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(editBookshelf(data));
        return data;
    }

}

export const removeBookshelf = (bookshelfId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookshelves/${bookshelfId}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteBookshelf());
        return data;
    }
}

export const removeBook = (bookId, bookshelfId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookshelves/delete`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            bookId: bookId,
            bookshelfId: bookshelfId
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteBook());
        return data;
    }
}

// ********************************* REDUCER ********************************* // 
const initialState = {};

export default function bookshelfReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_BOOKSHELVES: {
            const allBookshelves = {};
            action.bookshelves.forEach(bookshelf => {
                allBookshelves[bookshelf.id] = bookshelf;
            });
            return {
                ...state,
                allBookshelves
            }
        }
        case LOAD_BOOKSHELF: {
            const allBookshelves = { ...state.allBookshelves }
            const currBookshelf = action.bookshelf;
            return {
                ...state,
                allBookshelves,
                currBookshelf
            }
        }
        case ADD_BOOKSHELF: {
            const allBookshelves = { ...state.allBookshelves }
            allBookshelves[action.bookshelf.id] = action.bookshelf;
            return {
                ...state,
                allBookshelves
            }
        }
        case ADD_BOOK: {
            const allBookshelves = { ...state.allBookshelves }
            return { ...state, allBookshelves };
        }
        case EDIT_BOOKSHELF: {
            return {
                ...state,
                currBookshelf: { ...state.currentBookshelf, ...action.bookshelf }
            }
        }
        case DELETE_BOOKSHELF: {
            return {
                ...state
            }
        }
        case DELETE_BOOK: {
            return {
                ...state
            }
        }
        default:
            return state;
    }

}
