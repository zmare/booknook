import { csrfFetch } from './csrf';

// ******************************** CONSTANTS ******************************** // 
const LOAD_REVIEWS_USER = '/reviews/user';
const LOAD_REVIEW = `/reviews/current`
const ADD_REVIEW = '/reviews/add';
const EDIT_REVIEW = '/reviews/update';
const DELETE_REVIEW = '/reviews/delete';

// ***************************** ACTION CREATORS ***************************** // 
const loadReviews = reviews => ({
    type: LOAD_REVIEWS_USER,
    reviews
})

const loadReview = review => ({
    type: LOAD_REVIEW,
    review
})

const addReview = review => ({
    type: ADD_REVIEW,
    review
})

const editReview = review => ({
    type: EDIT_REVIEW,
    review
})

const deleteReview = () => ({
    type: DELETE_REVIEW
})

// ********************************* THUNKS ********************************** //
export const getReviewsUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/reviews/current");

    if (response.ok) {
        const data = await response.json();
        dispatch(loadReviews(data));
        return data;
    }
};

export const getReviewCurrent = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadReview(data));
        return data;
    }
};

export const createReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addReview(data));
        return data;
    }
}

export const updateReview = (reviewId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(editReview(data));
        return data;
    }

}

export const removeReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteReview());
        return data;
    }
}

// ********************************* REDUCER ********************************* // 
const initialState = {};

export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_REVIEWS_USER: {
            const userReviews = {};
            action.reviews.forEach(review => {
                userReviews[review.id] = review;
            });
            return {
                ...state,
                userReviews
            }
        }
        case LOAD_REVIEW: {
            const userReviews = { ...state.userReviews };
            const currReview = action.review;
            return {
                ...state,
                userReviews,
                currReview
            }

        }
        case ADD_REVIEW: {
            const userReviews = { ...state.userReviews };
            userReviews[action.review.id] = action.review;
            const currReview = action.review;
            return {
                ...state,
                userReviews,
                currReview
            }
        }
        case EDIT_REVIEW: {
            // const userReviews = { ...state.userReviews };
            const currReview = { ...state.currReview };
            // userReviews[action.review.id] = action.review;
            currReview = action.review
            return {
                ...state,
                currReview
            }
        }
        case DELETE_REVIEW: {
            return {
                ...state
            }
        }
        default:
            return state;
    }

}
