import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getBook } from '../../store/book';
import { getReviewsUser } from '../../store/review';
import { getBookshelves, addBook } from '../../store/bookshelves';
import ReviewIndex from '../Review/ReviewIndex';
import OpenModalButton from '../OpenModalButton';
import ReviewCreateEdit from '../Review/ReviewCreateEdit';
import "./Books.css"
import { getFriends, getRequests } from '../../store/friend';

// COMPONENT FOR ACTUAL BOOK INFORMATION 
const Books = () => {
    const rNum = (num) => Math.floor(Math.random() * Math.floor(num) + 1);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const { bookId } = useParams();
    let allShelves;

    let review = {
        review: '',
        stars: '',
    }

    let array = new Array(5).fill('');
    const [errors, setErrors] = [];

    useEffect(() => {
        dispatch(getBook(bookId))
        dispatch(getReviewsUser())
        dispatch(getBookshelves())
        dispatch(getFriends());
        dispatch(getRequests());
    }, [dispatch, allShelves, bookId])

    const book = useSelector(state => state.books.currBook);
    let userBookshelves = useSelector(state => state.bookshelves.allBookshelves); //all the bookshelves of the user
    let myReviews = useSelector(state => {
        if ((state.review.userReviews === null)) {
            return;
        } else {
            return state.review.userReviews
        }
    });

    if (!book) return null;
    let orderedReviews = [];
    if (!book.avgStarRating) book.avgStarRating = 'New';
    if (!userBookshelves) return null;

    allShelves = book.Bookshelves; // all the bookshelves a book is a part of 

    let allShelvesUser = [];

    for (let shelf of allShelves) {
        if (shelf.ownerId === user.id) {
            allShelvesUser.push(shelf)
        }
    }

    let hasReview = false;

    if (myReviews) {
        myReviews = Object.values(myReviews);
        for (let review of myReviews) {
            let bookId = parseInt(review.bookId);
            if (bookId === book.id) hasReview = true;
        }
    }

    for (let i = (book.Reviews).length - 1; i >= 0; i--) {
        orderedReviews.push(book.Reviews[i])
    };

    let availableBookshelves = { ...userBookshelves };

    // for each shelf that the book is in, remove that from the user's bookshelves list 
    if (allShelvesUser.length) {
        for (let shelf of allShelves) {
            delete availableBookshelves[shelf.id]
        }
    }

    availableBookshelves = Object.values(availableBookshelves)

    const handleAddBook = async (shelfId) => {
        try {
            let addBookToShelf = await dispatch(addBook(bookId, shelfId));
            if (addBookToShelf) {
                await dispatch(getBookshelves());
                await dispatch(getBook(bookId))
            }
        }
        catch (response) {
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors);
        }
    }

    return (
        <>
            <div className='book-info-container'>
                <div className="book-info-sidebar-container">
                    <div className="book-info-wrapper">
                        <div className='book-info-img-container'>
                            <img src={book.bookImage} alt=""></img>
                        </div>
                        <div className='book-info-bookself-selection-container'>
                            {allShelvesUser.length
                                ?
                                <div style={{ fontFamily: "'Montserrat',serif", fontSize: "10pt" }}>
                                    <p>You have this book on the following bookshelves:</p>
                                    {allShelvesUser.map(shelf => (
                                        <>
                                            <li style={{ listStyle: 'none', paddingLeft: '10px' }} key={`my-shelf-list-${shelf.id}`}>{shelf.name}</li>
                                            <br></br>
                                        </>
                                    ))}
                                </div>
                                :
                                ""
                            }
                            <br></br>
                            <div className="dropdown">
                                <button className={availableBookshelves.length ? "dropbtn" : "hidden"}>Add to a Bookshelf!</button>
                                <div className="dropdown-content">
                                    {availableBookshelves.map(shelf => (
                                        <p key={`shelf-list-${shelf.id}`} onClick={() => handleAddBook(shelf.id)}> {shelf.name}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="book-details-container" style={{ marginLeft: '40px' }}>
                    <p id='book-details-title'> {book.title}</p>
                    <p id='book-details-author'>by {book.author}</p>
                    <p id='book-details-summary'>{book.summary}</p>

                    {(book.numReviews && book.avgStarRating) ?
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '0' }}>
                            <p id='book-details-reviews'>{book.numReviews} {book.numReviews === 1 ? "review" : "reviews"}</p>
                            <p id='book-details-ratings'>{book.avgStarRating} rating</p>
                        </div>
                        :
                        ""
                    }
                    <div className='book-details-reviews-container'>
                        <h1 className='rating-review-title'>Rating & Reviews</h1>

                        {!hasReview ?
                            <>
                                <p className='rating-review-write'>Write a Review!</p>
                                <div className='review_spot_stars'>
                                    <div className='star-rating'>
                                        {array.map((index) => {
                                            index += 1
                                            if (user !== null && !hasReview) {
                                                return (
                                                    <OpenModalButton
                                                        key={`stars-add-${rNum(100)}`}
                                                        buttonText={<i className="fa-solid fa-star"></i>}
                                                        modalComponent={<ReviewCreateEdit book={book} review={review} type="Add" />}
                                                    />
                                                )
                                            } else {
                                                return (
                                                    <OpenModalButton
                                                        key={`stars-${index}`}
                                                        buttonText={<i className="fa-solid fa-star"></i>}
                                                        modalComponent={<ReviewCreateEdit book={book} review={review} type="Edit" />}
                                                    />
                                                )
                                            }
                                        })} stars
                                    </div>
                                    <div className="review-create-buttons">
                                        {user !== null && book.avgStarRating === 'New' ? (
                                            <>
                                                <OpenModalButton
                                                    className="test"
                                                    buttonText="Be the first to post a review!"
                                                    modalComponent={<ReviewCreateEdit book={book} review={review} type="Add" />}
                                                />
                                            </>
                                        ) : (user !== null && !hasReview) ? (
                                            <>
                                                <OpenModalButton
                                                    buttonText="Post Your Review"
                                                    modalComponent={<ReviewCreateEdit book={book} review={review} type="Add" />}
                                                />
                                            </>
                                        )
                                            : ''}
                                    </div>

                                </div>
                            </>
                            : ""}
                    </div>
                    < ReviewIndex book={book} reviews={orderedReviews} />
                </div>
            </div >
        </>

    )
}

export default Books