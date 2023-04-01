import { csrfFetch } from './csrf';

// ******************************** CONSTANTS ******************************** // 
const LOAD_BOOKS = '/books/all'
const LOAD_BOOK = '/books/book';

// ***************************** ACTION CREATORS ***************************** // 
const loadBooks = books => ({
    type: LOAD_BOOKS,
    books
})

const loadBook = book => ({
    type: LOAD_BOOK,
    book
})

// ********************************* THUNKS ********************************** //
export const getBooks = () => async (dispatch) => {
    const response = await csrfFetch(`/api/books`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadBooks(data));
        return data;
    }
}

export const getBook = (bookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/books/${bookId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadBook(data));
        return data;
    }
}

// ********************************* REDUCER ********************************* // 
const initialState = {};

export default function bookReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_BOOKS: {
            const allBooks = action.books;
            return {
                ...state,
                allBooks
            }
        }
        case LOAD_BOOK: {
            const currBook = action.book;
            return {
                ...state,
                currBook
            }
        }
        default:
            return state;
    }

}
