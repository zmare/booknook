import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom'
import { getBook } from '../../store/book';
import { createBookshelf, getBookshelf, getBookshelves } from '../../store/bookshelves';
import BookshelvesEditModal from '../BookshelvesEditModal';
import OpenModalButton from '../OpenModalButton'


const Review = ({ review }) => {
    const history = useHistory();
    const book = useSelector(state => state.books.currBook);

    const handleEdit = async (e) => {
        e.preventDefault();

        history.push(`/reviews/edit/${book.id}/${review.id}`);
    }

    return (
        <>
            <li>{review.review}</li>
            <li>{review.User.name}</li>
            <li>{review.stars} stars</li>
            <button onClick={handleEdit}>Edit</button>
            <button>Delete</button>
            <br></br>
        </>

    )
}

export default Review