import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, Redirect, useHistory } from 'react-router-dom'
import { getBook } from '../../store/book';
import { removeReview, updateReview } from '../../store/review';
import { createReview, getReviewsUser } from '../../store/review';
import { useModal } from '../../context/Modal';


const ReviewDelete = ({ book, review }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [errors, setErrors] = useState();

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await dispatch(removeReview(review.id));
            await dispatch(getBook(book.id));
            await dispatch(getReviewsUser());
            closeModal();
        }
        catch (response) {
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors);
        }
    }

    return (
        <form onSubmit={handleDelete}>
            <h1> Are you sure you'd like to delete this review? </h1>
            <button type='submit'>Yes</button>
            <button type="text" onClick={() => closeModal()}>Cancel</button>
        </form>
    )
}

export default ReviewDelete