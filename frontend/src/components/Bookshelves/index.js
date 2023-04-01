import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookshelves } from '../../store/bookshelves';
import { Link, NavLink, useParams } from 'react-router-dom';
//import { useSelector } from 'react-redux';
import BookshelvesSidebar from './BookshelvesSidebar';
import './Bookshelves.css'

const Bookshelves = () => {
    const dispatch = useDispatch();

    const { shelfId } = useParams();

    const user = useSelector(state => state.session.user);
    let bookshelves = useSelector(state => state.bookshelves.allBookshelves);

    useEffect(() => {
        dispatch(getBookshelves());
    }, [dispatch, user]);

    if (!user) return null;
    if (!bookshelves) return null;

    bookshelves = Object.values(bookshelves);

    return (
        <div className='test'>
            <div className="bookshelf-nav-container">
                <div className='bookshelf-nav-title'>
                    My Books
                </div>
                <div className='bookshelf-settings'>
                    <ul className='bookshelf-settings-ul'>
                        <li> Batch Edit </li>
                        <li> Settings </li>
                        <li> Stats </li>
                        <li> Print </li>
                        {/* <li> | </li> */}
                    </ul>
                </div>
            </div>

            <div className="bookshelf-details-container">
                <BookshelvesSidebar bookshelves={bookshelves} />
                {shelfId ?
                    <div className='bookshelf-book-details-container'>
                        <div className='book-nav'>
                            books nav
                        </div>
                        <div className='book-detail-index'>
                            book detail
                        </div>
                    </div>
                    :
                    ""
                }

            </div>



        </div>
    )
}

export default Bookshelves