import { csrfFetch } from './csrf';

// ******************************** CONSTANTS ******************************** // 
const LOAD_FRIENDS = '/friends/all'
const LOAD_REQUESTS = '/friend/requests/current'
const LOAD_PENDING = '/friends/requests/pending'
const SEND_FRIEND_REQUEST = '/friends/requests/send'
const DELETE_FRIEND_REQUEST = '/friends/requests/delete'
const CREATE_FRIEND = '/friends/new'
const DELETE_FRIEND = '/friends/delete'

// ***************************** ACTION CREATORS ***************************** // 
const loadFriends = friends => ({
    type: LOAD_FRIENDS,
    friends
})

const loadFriendRequests = requests => ({
    type: LOAD_REQUESTS,
    requests
})

const loadPendingRequests = requests => ({
    type: LOAD_PENDING,
    requests
})

const sendFriendRequest = request => ({
    type: SEND_FRIEND_REQUEST,
    request
})

const deleteFriendRequest = () => ({
    type: DELETE_FRIEND_REQUEST
})

const addFriend = friend => ({
    type: CREATE_FRIEND,
    friend
})

const removeFriend = () => ({
    type: DELETE_FRIEND
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
    }

    const pendingResponse = await csrfFetch(`/api/requests/pending`);

    if (pendingResponse.ok) {
        const data = await pendingResponse.json();
        dispatch(loadPendingRequests(data));
        return data;
    }
}

export const createFriendRequest = (friendId) => async (dispatch) => {
    const response = await csrfFetch(`/api/requests/${friendId}`,
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: ""
        })

    if (response.ok) {
        const data = await response.json();
        dispatch(sendFriendRequest(data))
    }
}

export const removeFriendRequest = (requestId) => async (dispatch) => {
    const response = await csrfFetch(`/api/requests/${requestId}`,
        {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: ""

        })

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteFriendRequest());
    }
}

export const createFriend = (request) => async (dispatch) => {
    const response = await csrfFetch(`/api/friends/${request.requestorId}`,
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                requestId: request.id,
                requestorId: request.requestorId,
                receiverId: request.receiverId
            })
        })

    if (response.ok) {
        const data = await response.json();
        dispatch(addFriend(data));
        return data;
    }
}

export const deleteFriend = (userId, friendId) => async (dispatch) => {
    const response = await csrfFetch(`/api/friends/delete`,
        {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: userId,
                friendId: friendId
            })
        });

    if (response.ok) {
        const data = await response.json();
        dispatch(removeFriend());
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
                allRequests
            }
        }
        case LOAD_PENDING: {
            const allPending = action.requests;
            return {
                ...state,
                allPending
            }
        }
        case SEND_FRIEND_REQUEST: {
            return { ...state }
        }
        case DELETE_FRIEND_REQUEST: {
            return { ...state }
        }
        case CREATE_FRIEND: {
            return { ...state }
        }
        case DELETE_FRIEND: {
            return { ...state }
        }
        default:
            return state;
    }

}
