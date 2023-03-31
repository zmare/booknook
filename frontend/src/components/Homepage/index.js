import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./Homepage.css"
import { getBookshelves } from "../../store/bookshelves";
import { getBooks } from "../../store/book";
import RecommendedBook from "./RecommendedBooks";

function Homepage() {
    const dispatch = useDispatch();
    const rNum = (num) => Math.floor(Math.random() * Math.floor(num) + 1);
    const user = useSelector(state => state.session.user);

    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getBookshelves());
        dispatch(getBooks());
    }, [dispatch])

    let bookshelves = useSelector(state => state.bookshelves.allBookshelves);
    let books = useSelector(state => state.books.allBooks)
    if (!bookshelves) return null;
    if (!books) return null;

    bookshelves = Object.values(bookshelves);
    books = Object.values(books);
    let currReadingBook = bookshelves[1].Books[0];

    let randomBooks = [];
    for (let i = 0; i < 5; i++) {
        randomBooks.push(books[rNum(10)]);
    }

    console.log('****', randomBooks)

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    return (
        <>
            {user ?
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

                :

                <>
                    <div>
                        <div className='banner-background-image'> </div>
                        <div className="login-form-container">
                            <div className="login-form">
                                <form onSubmit={handleSubmit}>
                                    <h1 style={{ fontWeight: 'bolder' }} className='login-form-header'>Welcome to BookNook!</h1>
                                    <h2 className='login-form-header' id='small-header'>Log in to get started!</h2>
                                    <ul style={{ color: 'red', fontFamily: "'Roboto',sans-serif", fontSize: '12px', listStyle: 'none', paddingRight: '30px' }}>
                                        {errors.map((error, idx) => (
                                            <li key={idx}>{error}</li>
                                        ))}
                                    </ul>
                                    <div>
                                        <label className='login-form-label'>
                                            Email
                                            <br></br>
                                            <input
                                                className='login-form-input'
                                                type="text"
                                                value={credential}
                                                onChange={(e) => setCredential(e.target.value)}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <br></br>
                                    <div>
                                        <label className='login-form-label'>
                                            Password
                                            <br></br>
                                            <input
                                                className='login-form-input'
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </label>
                                    </div>

                                    <br></br>
                                    <button className='login-form-button' type="submit">Log In</button>
                                    <button onClick={() => { setCredential('demo@user.io'); setPassword('password'); }} type="text" className='login-form-button' id='demo-user-button'>Log In Demo User</button>
                                    <p className="login-form-footer">Not a member?<span> </span>
                                        <NavLink to="/signup">Sign up!</NavLink>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="homepage-left-container">
                        <div className="left-para-container">
                            <h2>Deciding what to read next?</h2>
                            <p>
                                You’re in the right place. Tell us what titles or genres you’ve enjoyed in the past, and we’ll give you surprisingly insightful recommendations.
                                What are your friends reading?

                                Chances are your friends are discussing their favorite (and least favorite) books on Goodreads.
                            </p>
                        </div>
                        <div className='right-para-container'>
                            <h2>What are your friends reading?</h2>
                            <p>Chances are your friends are discussing their favorite (and least favorite) books on Goodreads. </p>
                        </div>

                    </div>
                </>
            }
        </>

    );
}

export default Homepage;