import { csrfFetch } from './csrf';

// ******************************** CONSTANTS ******************************** // 
const LOAD_FRIENDS = '/friends/all'
const LOAD_REQUESTS = '/friend/requests'

// ***************************** ACTION CREATORS ***************************** // 
const loadFriends = friends => ({
    type: LOAD_FRIENDS,
    friends
})

const loadFriendRequests = requests => ({
    type: LOAD_REQUESTS,
    requests
})


// ********************************* THUNKS ********************************** //
export const getFriends = () => async (dispatch) => {
    const response = await csrfFetch(`/api/friends/current`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadFriends(data));
        return data;
    }
}

export const getRequests = () => async (dispatch) => {
    const response = await csrfFetch(`/api/requests/current`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadFriendRequests(data));
        return data;
    }
}

// ********************************* REDUCER ********************************* // 
const initialState = {};

export default function friendReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_FRIENDS: {
            const allFriends = action.friends;
            return {
                ...state,
                allFriends
            }
        }
        case LOAD_REQUESTS: {
            const allRequests = action.requests;
            return {
                ...state,
                ...state.allFriends,
                allRequests
            }
        }
        default:
            return state;
    }

}
