import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Link, NavLink, Redirect, useHistory } from 'react-router-dom';
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
            <div className='homepage-parent-container'>
                <div className='banner-background-image'> </div>
                <div className="left-right-container">
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
                </div>
                <div className='list-card-wrapper'>
                    <div className='list-card'>
                        <div id='list-card-1'>
                            <p className="list-card-header">What will <span style={{ fontStyle: 'italic' }}>you</span> discover?</p>
                            <div className='list-card-para'>
                                <p>Because Deborah liked...</p>
                                <p>She discovered:</p>
                            </div>
                            <div className='list-card-img-container'>
                                <div>
                                    <img className='list-card-img' src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388800064l/9648068._SX98_.jpg"></img>
                                    <img className='list-card-img' src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1408500437l/7094569._SX98_.jpg"></img>
                                    <img className='list-card-img' src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1264898635l/7157310._SX98_.jpg"></img>

                                </div>

                                <div className='arrow'>
                                    <img className='list-card-img' id='arrow' src="https://s.gr-assets.com/assets/home/discovery_arrow-f1e8677f2c8b68500ed82ef0d5b7c59b.png"></img>
                                </div>

                                <div>
                                    <img className='list-card-img' src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388716938l/8051458._SX98_.jpg"></img>
                                </div>
                                <p className="discovered-categories">Zombies,<br></br> Post Apocalyptic, <br></br>Dystopia,<br></br>Urban Fantasy</p>


                            </div>
                        </div>
                        <div id='list-card-1'>
                            <div className='list-card-para'>
                                <p>Because Brian liked...</p>
                                <p>He discovered:</p>
                            </div>
                            <div className='list-card-img-container'>
                                <div >
                                    <img className='list-card-img' src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1480106986l/33917._SX98_.jpg"></img>
                                    <img className='list-card-img' src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1631251689l/4214._SX98_.jpg"></img>
                                    <img className='list-card-img' src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1563042852l/49628._SX98_.jpg"></img>

                                </div>
                                <div className='arrow'>
                                    <img className='list-card-img' id='arrow' src="https://s.gr-assets.com/assets/home/discovery_arrow-f1e8677f2c8b68500ed82ef0d5b7c59b.png"></img>
                                </div>
                                <div>
                                    <img className='list-card-img' src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1329421639l/50365._SX98_.jpg"></img>
                                </div>
                                <p className='discovered-categories'>Contemporary,<br></br>Classics</p>


                            </div>
                        </div>
                    </div>
                    <div className='homepage-news-container'>
                        <h2 className='homepage-bookshelf-header'>IN THE NEWS</h2>
                        <div>
                            <img style={{ width: '380px', height: "208px" }} src="https://images.gr-assets.com/misc/1677192167-1677192167_goodreads_misc.png" alt=''></img>
                            <p style={{ width: '380px' }} className="in-the-news-title">The Top Spring Mysteries Readers Can't Wait to Read</p>
                            <p style={{ width: '380px' }} className='in-the-news-article'>Good news, mystery mavens. Spring 2023 is shaping up to be an especially busy season for new mystery and thriller books. In fact, we’re looking at the list of the books your fellow readers are most excited about right now. So much goodness. <br></br> <br></br>Many of the usual suspects are already in the lineup. You’ll find new spring releases from old hands like Harlan Coben, Sally Hepworth, Robert Dugoni, David Baldacci, and a new one from S.A. Cosby. Several interesting debut novels are on the way as well, many with intriguing titles: Consider the mysterious atmosphere evoked by Bad Summer People or How I’ll Kill You.<br></br><br></br>Historical mysteries on the horizon promise some interesting time travel for those interested. Genre godfather Dennis Lehane visits Boston during the long hot summer of 1974 in Small Mercies. Author Sarah Penner explores Victorian-era England in The London Séance Society. And Jacqueline Winspear sets World War II spies against organized crime in The White Lady.</p>

                        </div>
                        <br></br>
                        {/* <div>
                            <img style={{ width: '300px', height: "158px" }} src='https://images.gr-assets.com/misc/1677192214-1677192214_goodreads_misc.png' alt=""></img>
                            <p className="in-the-news-title">The Biggest New Fantasy and Sci-Fi Books for Spring</p>
                            <p className="in-the-news-article">
                                Science fiction and fantasy fans, we bring glad tidings.

                                The spring season is positively stacked with great new books in and around the genres of science fiction and fantasy. We’ve collected the most anticipated of the lot here, as determined by Goodreads regulars’ Want to Read shelves and ratings from early readers (all titles here are scoring 3.5 stars and above in that regard).

                                Experienced SFF heads will recognize some of the veteran names here, including Martha Wells (demons!), T.J. Klune (robots!), and Ann Leckie (translators!). It’s also always good policy to pay attention to whatever Cory Doctorow is writing about—in this case, cryptocurrency and the surprisingly dangerous world of forensic accounting.

                                Traditionalists will note that there are not one but two modern-day King Arthur tales on the way. Genre benders should enjoy the SF/horror hybrids and science fantasy explorations. You’ll also find some fascinating variations on familiar themes, including a funny First Contact tale and cozy fantasy with an 83-year-old Chosen One.
                            </p>
                        </div> */}
                    </div>
                </div>
                <div className="page-footer-container">
                    <div className='page-footer-column'>
                        <span className='column-header'>Tech Stack - Frontend</span>
                        <div id='column-1'>
                            <li>Javascript</li>
                            <li>React</li>
                            <li>Redux</li>
                            <li>HTML5</li>
                            <li>CSS3</li>
                        </div>
                    </div>

                    <div className='page-footer-column'>
                        <span className='column-header'>Tech Stack - Backend</span>
                        <div id='column-2'>
                            <li>Express</li>
                            <li>Sequelize</li>
                            <li>SQLite3</li>
                        </div>
                    </div>

                    <div className='page-footer-column'>
                        <span className='column-header'>Connect</span>
                        <div id='column-3'>
                            <a className="link" id='link-1' href='https://www.linkedin.com/in/zaineb-marediya/' target="_blank"><i id='connect' className="fa-brands fa-linkedin"></i></a>
                            <a className='link' href="https://github.com/zmare" target="_blank"><i id='connect' className="fa-brands fa-github"></i></a>
                            <a className='link' href="https://zmare.github.io/" target="_blank"><i id='connect' className="fa-solid fa-circle-user"></i></a>
                        </div>
                    </div>

                </div>
            </div>

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

        </>
    );
}

export default Homepage;