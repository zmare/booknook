import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getBook } from '../../store/book';
import { getReviewsUser } from '../../store/review';
import { getBookshelves, addBook } from '../../store/bookshelves';
import { getAllLists, getUserLists, addBookToList } from "../../store/lists"
import ReviewIndex from '../Review/ReviewIndex';
import OpenModalButton from '../OpenModalButton';
import ReviewCreateEdit from '../Review/ReviewCreateEdit';
import "./Books.css"
import { getFriends, getRequests } from '../../store/friend';

// COMPONENT FOR ACTUAL BOOK INFORMATION 
const Books = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const { bookId } = useParams();
    let allShelves;
    let allLists;

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
        dispatch(getUserLists());
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
    let userLists = useSelector(state => state.lists.userLists); //all the lists of the user

    if (!book) return null;
    let orderedReviews = [];
    if (!book.avgStarRating) book.avgStarRating = 'New';
    if (!userBookshelves) return null;
    if (!userLists) return null;

    allShelves = book.Bookshelves; // all the bookshelves a book is a part of 
    allLists = book.Lists;  // all the lists a book is a part of 

    let allShelvesUser = [];
    let allListsUser = [];

    for (let shelf of allShelves) {
        if (shelf.ownerId === user.id) {
            allShelvesUser.push(shelf)
        }
    }

    for (let list of allLists) {
        if (list.ownerId === user.id) {
            allListsUser.push(list)
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
    let availableLists = { ...userLists };

    // for each shelf that the book is in, remove that from the user's bookshelves list 
    if (allShelvesUser.length) {
        for (let shelf of allShelves) {
            delete availableBookshelves[shelf.id]
        }
    }

    if (allListsUser.length) {
        for (let list of allLists) {
            delete availableLists[list.id]
        }
    }

    availableBookshelves = Object.values(availableBookshelves)
    availableLists = Object.values(availableLists)

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

    const handleAddBookList = async (listId) => {
        try {
            let addedBooktoList = await dispatch(addBookToList(bookId, listId));
            if (addedBooktoList) {
                await dispatch(getAllLists());
                await dispatch(getUserLists());
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
                                        <span key={`my-shelf-list-${shelf.id}`}>
                                            <li style={{ listStyle: 'none', paddingLeft: '10px' }} >{shelf.name}</li>
                                            <br></br>
                                        </span>
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
                                        <p key={`available-shelf-lists-${shelf.id}`} onClick={() => handleAddBook(shelf.id)}> {shelf.name}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='book-info-bookself-selection-container'>
                            {allListsUser.length
                                ?
                                <div style={{ fontFamily: "'Montserrat',serif", fontSize: "10pt" }}>
                                    <p>You have this book on the following lists:</p>
                                    {allListsUser.map(list => (
                                        <span key={`my-lists-${list.id}`}>
                                            <li style={{ listStyle: 'none', paddingLeft: '10px' }}>{list.name}</li>
                                        </span>


                                    ))}
                                </div>
                                :
                                ""
                            }
                            <br></br>
                            <div className="dropdown">
                                <button className={availableLists.length ? "dropbtn" : "hidden"}>Add to a List!</button>
                                <div className="dropdown-content">
                                    {availableLists.map(list => (
                                        <p key={`available-lists-${list.id}`} onClick={() => handleAddBookList(list.id)}> {list.name}</p>
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
                                                        key={`add-stars-${index}`}
                                                        buttonText={<i className="fa-solid fa-star"></i>}
                                                        modalComponent={<ReviewCreateEdit book={book} review={review} type="Add" />}
                                                    />
                                                )
                                            } else {
                                                return (
                                                    <OpenModalButton
                                                        key={`edit-stars-${index}`}
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