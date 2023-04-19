import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getBook } from '../../store/book';
import { updateReview } from '../../store/review';
import { createReview, getReviewsUser } from '../../store/review';
import { useModal } from '../../context/Modal';

const ReviewCreateEdit = ({ book, review, type }) => {
    const dispatch = useDispatch();

    let array = new Array(5).fill('');
    const { closeModal } = useModal();
    const [newReview, setNewReview] = useState(review.review)
    const [newStars, setNewStars] = useState(review.stars)
    const [errors, setErrors] = useState([]);
    const [formErrors, setFormErrors] = useState({});

    const user = useSelector(state => state.session.user)

    if (!user) return <Redirect to='/' />;

    const validateForm = (review) => {
        let err = {};

        if (!(review.review).length) {
            err.exists = "Review is required"
        }

        if ((review.review).length < 10) {
            err.length = 'Review must be 10 characters';
        }

        if ((review.stars) < 1 || (review.stars) > 5) {
            err.stars = 'Rating must be between 1 and 5'
        }
        //let alreadyExists = false;

        setFormErrors({ ...err });

        return (Object.keys(err).length === 0);
    }

    const handleSubmit = async (e) => {
        if (type === "Edit") {
            e.preventDefault();

            let updatedReview = {
                review: newReview,
                stars: newStars
            }

            if (!validateForm(updatedReview)) {
                return;
            };

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

            if (!validateForm(createdReview)) {
                return;
            };

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
        <form className='form-parent-container'>
            <h2 className='review-form-header'> Write a review </h2>
            <ul style={{ color: 'red', fontSize: '11pt', listStyle: 'none' }}>
                <li className='edit-bookshelf-error'>{formErrors.exists}</li>
                <li className='edit-bookshelf-error'>{formErrors.length}</li>
                <li className='edit-bookshelf-error'>{formErrors.stars}</li>
            </ul>

            <p className="reviews-para">What did you think? </p>
            <textarea rows='5' cols='5'
                placeholder="Write your review here"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
            ></textarea>
            <p className="reviews-para">Enter number of stars</p>
            <div className='review_spot_stars'>
                <div className='star-rating'>
                    {array.map((rating, index) => {
                        index += 1;

                        return (
                            <button
                                type="button"
                                key={index}
                                className={index <= newStars ? 'fill' : 'no-fill'}
                                onClick={() => setNewStars(index)}

                            >
                                <span>
                                    <i className="fa-solid fa-star"></i>
                                </span>
                            </button>

                        )
                    })} <span style={{ fontFamily: "'Montserrat', serif" }}>stars</span>
                </div>
            </div>
            {/* <input
                placeholder='number of stars'
                value={newStars}
                onChange={(e) => setNewStars(+e.target.value)}
            ></input> */}
            <br></br>
            {/* <button type='submit'>Submit</button> */}
            <button className={newReview.length < 1 ? 'disabled-btn' : 'edit-bookshelf-form-button'}
                type='submit'
                disabled={review.length < 10}
                onClick={handleSubmit}>Submit Your Review</button>
            <span onClick={closeModal} className="cancel-button" style={{ marginBottom: '20px' }}>Cancel</span>

        </form>
    )
}

export default ReviewCreateEdit