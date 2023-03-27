import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookshelves } from '../../store/bookshelves';
import { Link, NavLink } from 'react-router-dom';
import Books from '../Books';


const BookshelvesSidebar = ({ bookshelves }) => {
    return (
        <div className='bookshelf-sidebar-container'>
            <div className='bookshelves-header'>
                Bookshelves
            </div>
            <div>
                {bookshelves.map(bookshelf => (
                    <>
                        <NavLink key={`bookshelf-${bookshelf.id}`} to={`/shelf/${bookshelf.id}`}>
                            {bookshelf.name}
                        </NavLink>
                        <br></br>
                    </>
                ))}
            </div>
        </div>
    )
}

export default BookshelvesSidebar