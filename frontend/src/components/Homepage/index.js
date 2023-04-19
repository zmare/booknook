import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./Homepage.css"
import { getBookshelves } from "../../store/bookshelves";
import { getBooks } from "../../store/book";
import RecommendedBook from "./RecommendedBooks";
import HomepageLoggedIn from "./HomepageLoggedIn";

function Homepage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (user) return <Redirect to='/myfeed' />

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            await dispatch(sessionActions.login({
                credential: credential,
                password: password
            }))
            history.push('/myfeed');
        } catch (response) {
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors);
        }
    };

    const handleDemoLogin = async (e) => {
        e.preventDefault();
        setErrors([]);

        try {
            await dispatch(sessionActions.login({
                credential: 'demo@user.io',
                password: 'password'
            }))
            history.push('/myfeed');
        } catch (response) {
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors);
        }

    }

    return (
        <>

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
                                <button onClick={handleDemoLogin} type="text" className='login-form-button' id='demo-user-button'>Log In Demo User</button>
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
            {/* :
                <HomepageLoggedIn /> */}

        </>
    );
}

export default Homepage;