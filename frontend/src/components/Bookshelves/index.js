import React from 'react';
//import { Link, NavLink } from 'react-router-dom';
//import { useSelector } from 'react-redux';
import './Bookshelves.css'

const Bookshelves = () => {




    return (
        <>
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
                <div className='bookshelf-sidebar-container'>
                    <div className='bookshelves-header'>
                        Bookshelves
                    </div>
                    <div>

                    </div>
                </div>

                <div className='bookshelf-book-details-container'>
                    <div className='book-nav'>
                        books nav
                    </div>
                    <div className='book-detail-index'>
                        book detail
                    </div>
                </div>
            </div>
        </>
    )
}

export default Bookshelves