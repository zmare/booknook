import { csrfFetch } from './csrf';

// ******************************** CONSTANTS ******************************** // 
const LOAD_BOOKSHELVES = '/bookshelves/load';
const LOAD_BOOKSHELF = '/bookshelves/current';
const EDIT_BOOKSHELF = '/bookshelves/update'

// ***************************** ACTION CREATORS ***************************** // 
const loadBookshelves = bookshelves => ({
    type: LOAD_BOOKSHELVES,
    bookshelves
})

const loadBookshelf = bookshelf => ({
    type: LOAD_BOOKSHELF,
    bookshelf
})

const editBookshelf = bookshelf => ({
    type: EDIT_BOOKSHELF,
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
        case EDIT_BOOKSHELF: {
            return {
                ...state,
                currBookshelf: { ...state.currentServer, ...action.bookshelf }
            }
        }

        default:
            return state;
    }


}
