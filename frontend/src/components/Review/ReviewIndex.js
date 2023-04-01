
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from '../OpenModalButton';
import { getReviewsUser } from "../../store/review";
import ReviewCreateEdit from "./ReviewCreateEdit";
import Review from ".";
// import './ReviewsIndex.css';

const ReviewIndex = ({ book, reviews }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    return (
        <>
            <div className='review_rating_num'>
                {book.avgStarRating === "New" ? (
                    <p>
                        New
                    </p>
                ) : (
                    <>

                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '0' }}>
                            <p id='book-details-reviews' > {book.numReviews} {book.numReviews === 1 ? "review" : "reviews"}</p>
                            <p id='book-details-ratings'>{book.avgStarRating} rating</p>
                        </div>
                        {/* <p>
                            {book.avgStarRating}
                        </p>
                        <p>{book.numReviews} </p> */}
                    </>
                )}
            </div>
            <div>
                <h1> hello</h1>
                {reviews.map(review => (
                    <div key={`book-review-${review.id}`}>
                        <Review review={review} />
                    </div>
                ))}
            </div>
        </>

    )
}

export default ReviewIndex; 