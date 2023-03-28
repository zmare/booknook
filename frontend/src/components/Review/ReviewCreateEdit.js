import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, Redirect, useHistory } from 'react-router-dom'
import { getBook } from '../../store/book';
import { getReviewCurrent } from '../../store/review';
import { createBookshelf, getBookshelf, getBookshelves } from '../../store/bookshelves';
import { createReview, getReviewsUser } from '../../store/review';
import BookshelvesEditModal from '../BookshelvesEditModal';
import OpenModalButton from '../OpenModalButton'
import Review from '../Review';
const ReviewCreateEdit = () => {
    const dispatch = useDispatch();
    const { bookId, reviewId } = useParams();
    let currentReview = useSelector(state => state.review.currReviews)

    const [newReview, setNewReview] = useState({
        review: "",
        stars: ""
    });

    useEffect(() => {
        if (reviewId && currentReview) {
            dispatch(getReviewCurrent(reviewId));
        }
        dispatch(getBook(bookId));


    }, [dispatch, bookId, reviewId, currentReview])

    if (!currentReview) {
        console.log("returning null")
        return null;
    } else {
        setNewReview({
            review: currentReview.review,
            stars: currentReview.stars
        })
    }

    const handleSubmit = async (e) => {
        if (reviewId) {
            window.alert("you want to edit")
        } else {
            window.alert('you want to create')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1> Write a review </h1>
            <p>What did you think? </p>
            <textarea
                placeholder="write review here"
            // value={newReview.review}
            // onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
            ></textarea>
            <p>Enter number of stars</p>
            <input
                placeholder='number of stars'
            // value={newReview.stars}
            // onChange={(e) => setNewReview({ ...newReview, stars: e.target.value })}
            >
            </input>
            <br></br>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default ReviewCreateEdit