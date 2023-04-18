import { csrfFetch } from './csrf';

// ******************************** CONSTANTS ******************************** // 
const LOAD_LISTS_ALL = '/lists/load/all';
const LOAD_LISTS_USER = '/lists/load/user'
const LOAD_LIST = '/lists/current';
const ADD_LIST = '/lists/add';
const ADD_BOOK = '/lists/add/book';
//const EDIT_BOOKSHELF = '/bookshelves/update';
const DELETE_LIST = '/lists/delete';
const DELETE_BOOK = '/lists/delete/book';

// ***************************** ACTION CREATORS ***************************** // 
const loadAllLists = lists => ({
    type: LOAD_LISTS_ALL,
    lists
})
const loadUserLists = lists => ({
    type: LOAD_LISTS_USER,
    lists
})

const loadList = list => ({
    type: LOAD_LIST,
    list
})

const addList = list => ({
    type: ADD_LIST,
    list
})

const addBook = () => ({
    type: ADD_BOOK
})
// const editBookshelf = bookshelf => ({
//     type: EDIT_BOOKSHELF,
//     bookshelf
// })

const deleteList = () => ({
    type: DELETE_LIST
})

const deleteBook = () => ({
    type: DELETE_BOOK
})

// ********************************* THUNKS ********************************** //
export const getAllLists = () => async (dispatch) => {
    const response = await csrfFetch("/api/lists");

    if (response.ok) {
        const data = await response.json();
        dispatch(loadAllLists(data));
        return data;
    }
};

export const getUserLists = () => async (dispatch) => {
    const response = await csrfFetch("/api/lists/current");

    if (response.ok) {
        const data = await response.json();
        dispatch(loadUserLists(data));
        return data;
    }
};

export const getList = (listId) => async (dispatch) => {
    const response = await csrfFetch(`/api/lists/${listId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadList(data));
        return data;
    }
}

export const createList = (list) => async (dispatch) => {
    const response = await csrfFetch(`/api/lists/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(list)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addList(data));
        return data;
    }
}

export const addBookToList = (bookId, listId) => async (dispatch) => {
    const response = await csrfFetch(`/api/lists/add`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            bookId: bookId,
            listId: listId
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addBook());
        return data;
    }
}

// export const updateBookshelf = (bookshelfId, bookshelf) => async (dispatch) => {
//     const response = await csrfFetch(`/api/bookshelves/${bookshelfId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookshelf)
//     });

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(editBookshelf(data));
//         return data;
//     }

// }

export const removeList = (listId) => async (dispatch) => {
    const response = await csrfFetch(`/api/lists/${listId}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteList());
        return data;
    }
}

export const removeBookFromList = (bookId, listId) => async (dispatch) => {
    const response = await csrfFetch(`/api/lists/delete`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            bookId: bookId,
            listId: listId
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

export default function listReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_LISTS_ALL: {
            const allLists = {};
            action.lists.forEach(list => {
                allLists[list.id] = list;
            });
            return {
                ...state,
                allLists
            }
        }
        case LOAD_LISTS_USER: {
            const userLists = {};
            action.lists.forEach(list => {
                userLists[list.id] = list;
            });
            return {
                ...state,
                userLists
            }
        }
        case LOAD_LIST: {
            const currList = action.list;
            return {
                ...state,
                ...state.allBookshelves,
                currList
            }
        }
        case ADD_LIST: {
            return { ...state };
        }
        case ADD_BOOK: {
            return { ...state };
        }
        // case EDIT_BOOKSHELF: {
        //     return {
        //         ...state,
        //         currBookshelf: { ...state.currentBookshelf, ...action.bookshelf }
        //     }
        // }
        case DELETE_LIST: {
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
