import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom'
import { getBook } from '../../store/book';
import { createBookshelf, getBookshelf, getBookshelves } from '../../store/bookshelves';
import BookshelvesEditModal from '../BookshelvesEditModal';
import OpenModalButton from '../OpenModalButton'


const Books = () => {
    const dispatch = useDispatch();
    const { bookId } = useParams();

    useEffect(() => {
        dispatch(getBook(bookId))
    }, [dispatch])

    const book = useSelector(state => state.books.currBook);
    if (!book) return null;

    console.log(book);

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
                {book.Reviews.map(review => (
                    <>
                        <li>{review.review}</li>
                        <li>{review.User.name}</li>
                        <li>{review.stars} stars</li>
                        <br></br>
                    </>
                ))}
            </ul>

        </div>

    )
}

export default Books