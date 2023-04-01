import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'
import { getBook } from '../../store/book';
import { getReviewsUser } from '../../store/review';
import ReviewIndex from '../Review/ReviewIndex';
import OpenModalButton from '../OpenModalButton';
import ReviewCreateEdit from '../Review/ReviewCreateEdit';
import "./Books.css"

// COMPONENT FOR ACTUAL BOOK INFORMATION 
const Books = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const { bookId } = useParams();

    let review = {
        review: '',
        stars: '',
    }

    let array = new Array(5).fill('');
    const [stars, setStars] = useState(0);

    useEffect(() => {
        dispatch(getBook(bookId))
        dispatch(getReviewsUser())
    }, [dispatch])

    const book = useSelector(state => state.books.currBook);
    let myReviews = useSelector(state => {
        if ((state.review.userReviews === null)) {
            return;
        } else {
            return state.review.userReviews
        }
    });

    if (!book) return null;
    let orderedReviews = [];
    if (!book.avgStarRating) book.avgStarRating = 'New';

    let hasReview = false;

    if (myReviews) {
        myReviews = Object.values(myReviews);
        for (let review of myReviews) {
            let bookId = parseInt(review.bookId);
            if (bookId === book.id) hasReview = true;
        }
    }

    for (let i = (book.Reviews).length - 1; i >= 0; i--) {
        orderedReviews.push(book.Reviews[i])
    };

    return (
        <>
            <div className='book-info-container'>
                <div className="book-info-sidebar-container">
                    <div className="book-info-wrapper">
                        <div className='book-info-img-container'>
                            <img src={book.bookImage}></img>
                        </div>
                        <div className='book-info-bookself-selection-container'>
                            <h1>testing stickiness</h1>
                        </div>
                    </div>

                </div>
                <div className="book-details-container" style={{ marginLeft: '20px' }}>
                    <p id='book-details-title'> {book.title}</p>
                    <p id='book-details-author'>by {book.author}</p>
                    <p id='book-details-summary'>{book.summary}</p>

                    {(book.numReviews && book.avgStarRating) ?
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '0' }}>
                            <p id='book-details-reviews'> {book.numReviews} {book.numReviews === 1 ? "review" : "reviews"}</p>
                            <p id='book-details-ratings'>{book.avgStarRating} rating</p>
                        </div>
                        :
                        ""
                    }
                    <div className='book-details-reviews-container'>
                        <h1 className='rating-review-title'>Rating & Reviews</h1>

                        {!hasReview ?
                            <>
                                <p className='rating-review-write'>Write a Review!</p>
                                <div className='review_spot_stars'>
                                    <div className='star-rating'>
                                        {array.map((rating, index) => {
                                            index += 1
                                            if (user !== null && !hasReview) {
                                                return (
                                                    <OpenModalButton
                                                        buttonText={<i class="fa-solid fa-star"></i>}
                                                        modalComponent={<ReviewCreateEdit book={book} review={review} type="Add" />}
                                                    />

                                                )
                                            } else {
                                                return (
                                                    <OpenModalButton
                                                        buttonText={<i className="fa-solid fa-star"></i>}
                                                        modalComponent={<ReviewCreateEdit book={book} review={review} type="Edit" />}
                                                    />
                                                )
                                            }
                                        })} stars
                                    </div>
                                    <div className="review-create-buttons">
                                        {user !== null && book.avgStarRating === 'New' ? (
                                            <>
                                                <OpenModalButton
                                                    className="test"
                                                    buttonText="Be the first to post a review!"
                                                    modalComponent={<ReviewCreateEdit book={book} review={review} type="Add" />}
                                                />
                                            </>
                                        ) : (user !== null && !hasReview) ? (
                                            <>
                                                <OpenModalButton
                                                    buttonText="Post Your Review"
                                                    modalComponent={<ReviewCreateEdit book={book} review={review} type="Add" />}
                                                />
                                            </>
                                        )
                                            : ''}
                                    </div>

                                </div>
                            </>
                            : ""}
                    </div>

                    < ReviewIndex book={book} reviews={orderedReviews} />

                </div>
            </div >
        </>

    )
}

export default Books