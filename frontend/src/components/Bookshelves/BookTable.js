import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom'
import { createBookshelf, getBookshelf, getBookshelves } from '../../store/bookshelves';
import BookshelvesEditModal from '../BookshelvesEditModal';
import BookTableCard from './BookTableCard';
import OpenModalButton from '../OpenModalButton'

//WILL BE THE COMPONENET THAT RENDERS FROM THE BOOKSHELF PAGE. THE BOOK TABLE 

const BookTable = ({ bookshelf }) => {
    const dispatch = useDispatch();
    const { shelfId } = useParams();
    console.log(shelfId)
    console.log("this is from booktable", bookshelf)
    //let book = useSelector(state => state.bookshelves.currBookshelf)

    // useEffect(() => {
    //     dispatch(getBookshelf(shelfId));
    // }, [dispatch, shelfId])

    //const bookshelf = useSelector(state => state.bookshelves.currBookshelf);
    //if (!bookshelf) return null;
    //if (!book) return null;

    return (
        <>
            <div style={{ display: 'flex' }}>
                <h1 style={{ marginTop: "0" }}>
                    {bookshelf.name}
                </h1>
                {(bookshelf.name !== "Read" && bookshelf.name !== "Currently Reading" && bookshelf.name !== "Want to Read") ?
                    <div>
                        <OpenModalButton
                            buttonText={<i class="fa-solid fa-gear"></i>}
                            modalComponent={<BookshelvesEditModal bookshelf={bookshelf} />}
                        />
                    </div>
                    :
                    ""
                }

            </div>

            {
                bookshelf.Books.length ?
                    <div>
                        {bookshelf.Books.map(book => (
                            <>
                                <NavLink to={`/books/${book.id}`}>
                                    <BookTableCard book={book} />
                                </NavLink>
                            </>
                        ))}
                    </div>
                    :
                    <p>No books in this bookshelf</p>
            }

        </>


    )
}

export default BookTable