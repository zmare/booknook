import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBook } from '../../store/book';
import { updateReview } from '../../store/review';
import { createReview, getReviewsUser } from '../../store/review';
import { useModal } from '../../context/Modal';

const ReviewCreateEdit = ({ book, review, type }) => {
    const dispatch = useDispatch();

    const { closeModal } = useModal();
    const [newReview, setNewReview] = useState(review.review)
    const [newStars, setNewStars] = useState(review.stars)
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        if (type === "Edit") {
            e.preventDefault();

            let updatedReview = {
                review: newReview,
                stars: newStars
            }

            try {
                let returnedReview = await dispatch(updateReview(review.id, updatedReview));
                if (returnedReview) {
                    await dispatch(getBook(book.id));
                    await dispatch(getReviewsUser());
                    closeModal();
                }
            }
            catch (response) {
                const data = await response.json();
                if (data && data.errors) setErrors(data.errors);
            }
        }

        if (type === "Add") {
            e.preventDefault();

            let createdReview = {
                review: newReview,
                stars: newStars
            }

            try {
                let returnedReview = await dispatch(createReview(createdReview, book.id));
                if (returnedReview) {
                    await dispatch(getBook(book.id));
                    await dispatch(getReviewsUser());
                    closeModal();
                }
            }
            catch (response) {
                const data = await response.json();
                if (data && data.errors) setErrors(data.errors);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1> Write a review </h1>
            <p>What did you think? </p>
            <textarea
                placeholder="write review here"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
            ></textarea>
            <p>Enter number of stars</p>
            <input
                placeholder='number of stars'
                value={newStars}
                onChange={(e) => setNewStars(+e.target.value)}
            ></input>
            <br></br>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default ReviewCreateEdit