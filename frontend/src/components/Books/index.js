import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, Redirect, useHistory } from 'react-router-dom'
import { getBook } from '../../store/book';
import { createBookshelf, getBookshelf, getBookshelves } from '../../store/bookshelves';
import { createReview, getReviewsUser } from '../../store/review';
import BookshelvesEditModal from '../BookshelvesEditModal';
import OpenModalButton from '../OpenModalButton'
import Review from '../Review';
import ReviewCreateEdit from '../Review/ReviewCreateEdit';


const Books = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { bookId } = useParams();

    let review = {
        review: '',
        stars: '',
    }

    useEffect(() => {
        dispatch(getBook(bookId))
        dispatch(getReviewsUser())
    }, [dispatch])

    const book = useSelector(state => state.books.currBook);
    if (!book) return null;
    let orderedReviews = [];

    for (let i = (book.Reviews).length - 1; i >= 0; i--) {
        orderedReviews.push(book.Reviews[i])
    };

    return (
        <div style={{ marginLeft: '20px' }}>
            <h1> book detail page </h1>
            <img src={book.bookImage} style={{
                display: 'block',
                maxHeight: '365px',
                maxWidth: '230px'
            }}></img>
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.summary}</p>
            <p>{book.numReviews} reviews</p>
            <p>{book.avgStarRating} rating</p>

            <ul>
                <OpenModalButton
                    buttonText='Add Review'
                    modalComponent={<ReviewCreateEdit book={book} review={review} type='Add' />}
                />
                {orderedReviews.map(review => (
                    <div key={`book-review-${review.id}`}>
                        <Review review={review} />
                    </div>
                ))}
            </ul>

        </div>

    )
}

export default Books