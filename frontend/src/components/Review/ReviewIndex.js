import { useDispatch, useSelector } from "react-redux";
import Review from ".";
import './Review.css';

const ReviewIndex = ({ book, reviews }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    console.log(book, reviews);

    return (
        <>
            <div className='review_rating_num'>
                {book.avgStarRating === "New" ? (
                    <p style={{
                        fontFamily: " 'Libre Baskerville ', serif",
                        fontSize: "18px",
                        fontWeight: '600',
                        lineHeight: "31px",
                        color: "rgb(30, 25, 21)"
                    }}>
                        New
                    </p>
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '0' }}>
                            <p id='book-details-reviews-large'> {book.numReviews} {book.numReviews === 1 ? "review" : "reviews"}</p>
                            <p id='book-details-ratings-large'>{book.avgStarRating} rating</p>
                        </div>
                    </>
                )}
            </div>
            <div>
                {reviews.map(review => (
                    <div key={`book-review-${review.id}`}>
                        <>
                            <Review review={review} />
                        </>

                    </div>
                ))}
            </div>
        </>

    )
}

export default ReviewIndex; 