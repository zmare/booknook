import { csrfFetch } from './csrf';

// ******************************** CONSTANTS ******************************** // 
const LOAD_BOOKSHELVES = '/bookshelves/load';
const LOAD_BOOKSHELF = '/bookshelves/current'

// ***************************** ACTION CREATORS ***************************** // 
const loadBookshelves = bookshelves => ({
    type: LOAD_BOOKSHELVES,
    bookshelves
})

const loadBookshelf = bookshelf => ({
    type: LOAD_BOOKSHELF,
    bookshelf
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
        default:
            return state;
    }


}
