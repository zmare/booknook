import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookshelf, getBookshelves } from '../../store/bookshelves';
import { useParams } from 'react-router-dom';
import BookshelvesSidebar from './BookshelvesSidebar';
import BookTable from './BookTable';
import BookshelfNavigation from './BookshelfNavigation';
import './Bookshelves.css'


const Bookshelves = () => {
    const dispatch = useDispatch();

    const { shelfId } = useParams();

    const user = useSelector(state => state.session.user);
    let bookshelves = useSelector(state => state.bookshelves.allBookshelves);
    //let book = useSelector(state => state.bookshelves.currBookshelf)

    useEffect(() => {
        dispatch(getBookshelves())
        if (shelfId) dispatch(getBookshelf(shelfId));
    }, [dispatch, user, shelfId]);

    if (!user) return null;
    if (!bookshelves) return null;
    // if (!book) return null;

    let bookshelf = bookshelves[shelfId];
    bookshelves = Object.values(bookshelves);

    let Books = {};

    for (let myBookshelf of bookshelves) {
        let books = Object.values(myBookshelf.Books);

        for (let book of books) {
            Books[book.id] = book;
        }
    }

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
                <div className='test'>
                    <BookshelvesSidebar bookshelves={bookshelves} />
                </div>
                <div className='test2'>
                    {shelfId ?
                        <BookTable bookshelf={bookshelf} />
                        :
                        <BookTable bookshelf={allBookshelf} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Bookshelves