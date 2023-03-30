import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./Homepage.css"

function Homepage() {
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

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
                    <h1>hello from homepage component! </h1>
                </>

                :

                <>
                    <div>
                        <div className='banner-background-image'> </div>
                        <div className="login-form-container">
                            <div className="login-form">
                                <form onSubmit={handleSubmit}>
                                    <h1 style={{ fontSize: '16px' }}>Welcome to BookNook! Login to get started!</h1>
                                    <ul>
                                        {errors.map((error, idx) => (
                                            <li key={idx}>{error}</li>
                                        ))}
                                    </ul>
                                    <label>
                                        Email
                                        <input
                                            type="text"
                                            value={credential}
                                            onChange={(e) => setCredential(e.target.value)}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Password
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </label>
                                    <button type="submit">Log In</button>
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