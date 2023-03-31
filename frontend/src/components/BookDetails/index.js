import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom'
import { createBookshelf, getBookshelf, getBookshelves } from '../../store/bookshelves';
import BookshelvesEditModal from '../BookshelvesEditModal';
import OpenModalButton from '../OpenModalButton'


const BookDetails = () => {
    const dispatch = useDispatch();
    const { shelfId } = useParams();

    useEffect(() => {
        dispatch(getBookshelf(shelfId));
    }, [dispatch])

    const bookshelf = useSelector(state => state.bookshelves.currBookshelf);
    if (!bookshelf) return null;

    return (
        <>
            <h1>
                hello from {bookshelf.name} Bookshelf
            </h1>

            <div>
                <OpenModalButton
                    buttonText="edit"
                    modalComponent={<BookshelvesEditModal bookshelf={bookshelf} />}
                />
            </div>

            {bookshelf.Books ?
                <div>
                    Books in this bookshelf are:
                    {bookshelf.Books.map(book => (
                        <>
                            <br></br>
                            <NavLink to={`/books/${book.id}`}>
                                {book.title}
                            </NavLink>
                            <br></br>
                        </>
                    ))}
                </div> : null}

        </>


    )
}

export default BookDetails