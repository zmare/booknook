import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookshelf, getBookshelves } from '../../store/bookshelves';
import { Redirect, useParams } from 'react-router-dom';
import BookshelvesSidebar from './BookshelvesSidebar';
import BookTable from './BookTable';
import BookshelfNavigation from './BookshelfNavigation';
import './Bookshelves.css'


const Bookshelves = () => {
    const dispatch = useDispatch();

    const { shelfId } = useParams();

    const user = useSelector(state => state.session.user);
    let bookshelves = useSelector(state => state.bookshelves.allBookshelves);

    useEffect(() => {
        dispatch(getBookshelves())
        if (shelfId) dispatch(getBookshelf(shelfId));
    }, [dispatch, user, shelfId]);


    let Books = {};
    let bookshelf;

    if (!user) return <Redirect to='/' />;
    if (!bookshelves) return null

    bookshelf = bookshelves[shelfId];
    bookshelves = Object.values(bookshelves);

    for (let myBookshelf of bookshelves) {
        if (myBookshelf.Books) {
            let books = Object.values(myBookshelf.Books);

            for (let book of books) {
                Books[book.id] = book;
            }
        }

    }

    bookshelves = Object.values(bookshelves);

    Books = Object.values(Books);
    let allBookshelf = {
        name: 'All',
        Books: Books
    }

    bookshelves.unshift(allBookshelf);

    return (
        <div>
            <div className="bookshelf-nav-container">
                <BookshelfNavigation />
            </div>
            <div className="bookshelf-details-container">
                <div className='my-bookshelf-sidebar'>
                    <BookshelvesSidebar bookshelves={bookshelves} />
                </div>
                <div className='my-book-table'>
                    {shelfId ?
                        <BookTable bookshelf={bookshelf} bookshelves={bookshelves} />
                        :
                        <BookTable bookshelf={allBookshelf} bookshelves={bookshelves} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Bookshelves