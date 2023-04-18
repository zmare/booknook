import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import { getBookshelves } from "../../store/bookshelves";
import { getBooks } from "../../store/book";
import RecommendedBook from "./RecommendedBooks";
import "./Homepage.css"

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

    if (!user) return <Redirect to='/' />

    let currReadingBook;

    if (!bookshelves) return null
    else {
        bookshelves = Object.values(bookshelves);
        currReadingBook = bookshelves[1].Books[0];
    };

    if (!books) return null;
    let randomBooks = [];
    for (let i = 0; i < 5; i++) {
        randomBooks.push(books[rNum(15)]);
    }

    return (
        <>
            <div className='homepage-wrapper'>
                <div className='homepage-column-container' id='column-one'>
                    <NavLink to={currReadingBook ? `/books/${currReadingBook.id}` : `/shelf`} className='homepage-bookshelf-container'>
                        <h2 className='homepage-bookshelf-header'>CURRENTLY READING</h2>
                        {!currReadingBook ?
                            <div style={{ display: 'flex' }}>
                                <img src="https://s.gr-assets.com/assets/react_components/currently_reading/icn_default_CR_ltrail-16f28d39654104ceb329648a474943eb.svg" alt=""></img>
                                <p className='homepage-bookshelf-para'>What are you reading? </p>
                            </div>
                            :
                            <div style={{ display: "flex" }}>
                                <img className="homepage-bookshelf-image" src={currReadingBook.bookImage} alt=""></img>
                                <div>
                                    <p id='homepage-bookshelf-book-title'>{currReadingBook.title}</p>
                                    <p id='homepage-bookshelf-book-author'>by {currReadingBook.author}</p>
                                </div>
                            </div>
                        }
                    </NavLink>
                </div>
                <div className='homepage-column-container' id='column-two'>
                    <div className='homepage-recommendations-container'>
                        <h2 className='homepage-bookshelf-header-rec'>RECOMMENDED FOR YOU</h2>
                        <div>
                            {randomBooks.map((book, index) => (
                                <NavLink key={`recommended-books-${index}`} style={{ textDecoration: 'none' }} to={`/books/${book.id}`}>
                                    <RecommendedBook book={book} />
                                </NavLink>

                            ))}
                        </div>

                    </div>
                </div>
                <div className='homepage-column-container' id='column-three'>
                    <div className='homepage-in-the-news-container'>
                        <h2 className='homepage-bookshelf-header'>IN THE NEWS</h2>
                        <div>
                            <img style={{ width: '300px', height: "158px" }} src="https://images.gr-assets.com/misc/1679599196-1679599196_goodreads_misc.png" alt=''></img>
                            <p className="in-the-news-title">Readers' Top Romances for April</p>
                            <p className='in-the-news-article'>New in April: Mazey Eddings chronicles a complicated wedding situation in The Plus One. Carlyn Greenwald writes of a lesbian Hollywood flirtation in Sizzle Reel. And Suzanne Park goes back to college in The Do-Over. Also in the mix for April: Victorian-era romance, doctors in love, and Emily Henry's newest. Whew, what a great month!</p>
                        </div>
                        <br></br>
                        <div>
                            <img style={{ width: '300px', height: "158px" }} src='https://images.gr-assets.com/misc/1677192214-1677192214_goodreads_misc.png' alt=""></img>
                            <p className="in-the-news-title">The Biggest New Fantasy and Sci-Fi Books for Spring</p>
                            <p className="in-the-news-article">
                                Science fiction and fantasy fans, we bring glad tidings.

                                The spring season is positively stacked with great new books in and around the genres of science fiction and fantasy. We’ve collected the most anticipated of the lot here, as determined by Goodreads regulars’ Want to Read shelves and ratings from early readers (all titles here are scoring 3.5 stars and above in that regard).

                                Experienced SFF heads will recognize some of the veteran names here, including Martha Wells (demons!), T.J. Klune (robots!), and Ann Leckie (translators!). It’s also always good policy to pay attention to whatever Cory Doctorow is writing about—in this case, cryptocurrency and the surprisingly dangerous world of forensic accounting.

                                Traditionalists will note that there are not one but two modern-day King Arthur tales on the way. Genre benders should enjoy the SF/horror hybrids and science fantasy explorations. You’ll also find some fascinating variations on familiar themes, including a funny First Contact tale and cozy fantasy with an 83-year-old Chosen One.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomepageLoggedIn