import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBook } from '../../store/book';
import { removeReview } from '../../store/review';
import { getReviewsUser } from '../../store/review';
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
        <form className="form-parent-container" onSubmit={handleDelete}>
            <h1 className="review-form-header"> Are you sure you'd like to delete this review? </h1>
            <button className="edit-bookshelf-form-button" type='submit' style={{ marginTop: '20px' }}>Yes</button>
            <span className='cancel-button' style={{ marginBottom: '20px' }} type="text" onClick={() => closeModal()}>Cancel</span>
        </form>
    )
}

export default ReviewDelete