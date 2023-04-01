import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom'
import { getBook } from '../../store/book';
import { createBookshelf, getBookshelf, getBookshelves } from '../../store/bookshelves';
import BookshelvesEditModal from '../BookshelvesEditModal';
import OpenModalButton from '../OpenModalButton'
import ReviewCreateEdit from './ReviewCreateEdit';
import ReviewDelete from './ReviewDelete';


const Review = ({ review }) => {
    const history = useHistory();
    const book = useSelector(state => state.books.currBook);
    const user = useSelector(state => state.session.user)

    let newDate = new Date(review.createdAt);
    newDate = newDate.toDateString();
    review.createdAt = newDate;
    review.month = review.createdAt.split(' ')[1];
    review.year = review.createdAt.split(' ')[3];

    return (
        <>
            <li>
                <img style={{ borderRadius: '50%', width: '56px', height: '56px', objectFit: 'contain', backgroundColor: 'rgb(238,237,224)' }} src="https://s.gr-assets.com/assets/nophoto/user/u_225x300-c928cbb998d4ac6dd1f0f66f31f74b81.png"></img>
            </li>
            <li>{review.review}</li>
            <li>{review.User.name}</li>
            <li>{review.stars} stars</li>
            <li>{review.year} {review.month}</li>
            {(user !== null && user.id === review.User.id) ?
                (
                    <>
                        <OpenModalButton
                            buttonText="Edit"
                            modalComponent={<ReviewCreateEdit book={book} review={review} type='Edit' />} />
                        <OpenModalButton
                            buttonText="Delete"
                            modalComponent={<ReviewDelete book={book} review={review} />}
                        />
                    </>
                ) :
                ''}
            <br></br>
        </>

    )
}

export default Review