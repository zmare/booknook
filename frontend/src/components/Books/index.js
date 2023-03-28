import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, Redirect, useHistory } from 'react-router-dom'
import { getBook } from '../../store/book';
import { createBookshelf, getBookshelf, getBookshelves } from '../../store/bookshelves';
import { createReview, getReviewsUser } from '../../store/review';
import BookshelvesEditModal from '../BookshelvesEditModal';
import OpenModalButton from '../OpenModalButton'
import Review from '../Review';


const Books = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { bookId } = useParams();

    useEffect(() => {
        dispatch(getBook(bookId))
        dispatch(getReviewsUser())
    }, [dispatch])

    const book = useSelector(state => state.books.currBook);
    if (!book) return null;

    const handleAdd = async (e) => {
        e.preventDefault();

        history.push(`/reviews/edit/${book.id}`);
    }

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
                <button onClick={handleAdd}>Add Review</button>
                {book.Reviews.map(review => (
                    <>
                        <Review review={review} />
                    </>
                ))}
            </ul>

        </div>

    )
}

export default Books