import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./Homepage.css"
import { getBookshelves } from "../../store/bookshelves";
import { getBooks } from "../../store/book";
import RecommendedBook from "./RecommendedBooks";


const HomepageLoggedIn = () => {
    const dispatch = useDispatch();
    const rNum = (num) => Math.floor(Math.random() * Math.floor(num) + 1);
    const user = useSelector(state => state.session.user);
    let bookshelves = useSelector(state => state.bookshelves.allBookshelves);
    let books = useSelector(state => state.books.allBooks)

    useEffect(() => {
        if (user) { dispatch(getBookshelves()); }
        dispatch(getBooks());
    }, [user, dispatch])

    let currReadingBook;

    if (!bookshelves) return null
    else {
        bookshelves = Object.values(bookshelves);
        //books = Object.values(books);
        currReadingBook = bookshelves[1].Books[0];
    };

    if (!books) return null;
    let randomBooks = [];
    for (let i = 0; i < 5; i++) {
        randomBooks.push(books[rNum(10)]);
    }

    return (
        <>
            <div className='homepage-wrapper'>
                <div className='homepage-column-container' id='column-one'>
                    <div className='homepage-bookshelf-container'>
                        <h2 className='homepage-bookshelf-header'>CURRENTLY READING</h2>
                        {!currReadingBook ?
                            <div style={{ display: 'flex' }}>
                                <img src="https://s.gr-assets.com/assets/react_components/currently_reading/icn_default_CR_ltrail-16f28d39654104ceb329648a474943eb.svg"></img>
                                <p className='homepage-bookshelf-para'>What are you reading? </p>
                            </div>
                            :
                            <div style={{ display: "flex" }}>
                                <img className="homepage-bookshelf-image" src={currReadingBook.bookImage}></img>
                                <div>
                                    <p id='homepage-bookshelf-book-title'>{currReadingBook.title}</p>
                                    <p id='homepage-bookshelf-book-author'>by {currReadingBook.author}</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className='homepage-column-container' id='column-two'>
                    <div className='homepage-recommendations-container'>
                        <h2 className='homepage-bookshelf-header-rec'>RECOMMENDED FOR YOU</h2>
                        <div>
                            {randomBooks.map(book => (
                                <NavLink style={{ textDecoration: 'none' }} to={`/books/${book.id}`}>
                                    <RecommendedBook book={book} />
                                </NavLink>

                            ))}
                        </div>

                    </div>
                </div>
                <div className='homepage-column-container' id='column-three'>
                    <div className='homepage-in-the-news-container'>
                        <h2 className='homepage-bookshelf-header'>IN THE NEWS</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomepageLoggedIn