import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import FriendAddModal from '../../components/Friends/FriendAddModal';
import ReviewCreateEdit from './ReviewCreateEdit';
import ReviewDelete from '../Review/ReviewDelete';
import './Review.css'
import { useEffect } from 'react';
import { getReviewsUser } from '../../store/review';
import { getBookshelves } from '../../store/bookshelves';
import { getUserLists } from "../../store/lists"
import { getFriends, getRequests } from '../../store/friend';


const Review = ({ review }) => {
    const dispatch = useDispatch();
    const book = useSelector(state => state.books.currBook);
    const user = useSelector(state => state.session.user);
    const friends = useSelector(state => state.friends.allFriends);
    const requests = useSelector(state => state.friends.allRequests);
    const pending = useSelector(state => state.friends.allPending);

    if (user && !friends) return;
    if (user && !requests) return;
    if (user && !pending) return;

    let myFriends = [];

    if (user) {
        for (let friend of friends) {
            myFriends.push(friend.User.name)
        }

        for (let request of requests) {
            myFriends.push(request.User.name)
        }

        for (let request of pending) {
            myFriends.push(request.User.name)
        }
    }


    const isFriend = (friend) => {
        if (myFriends.indexOf(friend) !== -1) return true;
        else return false;
    }

    let newDate = new Date(review.createdAt);
    newDate = newDate.toDateString();
    review.createdAt = newDate;
    review.month = review.createdAt.split(' ')[1];
    review.year = review.createdAt.split(' ')[3];

    let array = new Array(review.stars).fill('');

    return (
        <>
            <div style={{ display: 'flex', listStyle: 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <img style={{ borderRadius: '50%', width: '56px', height: '56px', objectFit: 'contain', backgroundColor: 'rgb(238,237,224)' }} src="https://s.gr-assets.com/assets/nophoto/user/u_225x300-c928cbb998d4ac6dd1f0f66f31f74b81.png" alt=""></img>
                </div>

                <div className='review-container'>
                    <div>
                        {array.map((star, index) => (
                            <i key={`review-star-${index}`} className="fa-solid fa-star"></i>
                        ))}
                    </div>
                    <div className='review-user-date-container'>
                        <div style={{ display: 'flex', flexDirection: 'row' }} className='review-add-user'>
                            {(user && !isFriend(review.User.name) && review.User.name !== user.name) ?
                                <OpenModalButton
                                    buttonText={<i className="fa-solid fa-user-plus"> </i>}
                                    modalComponent={<FriendAddModal friend={review.User} />}
                                />
                                :
                                ''
                            }
                            <li className="review-username">{review.User.name}</li>
                        </div>
                        <li className='review-review-date'>{review.year} {review.month}</li>
                    </div>
                    <div className='review-review'>
                        {review.review}
                    </div>
                    {(user !== null && user.id === review.User.id) ?
                        (
                            <div className='review-edit-delete-buttons'>
                                <OpenModalButton
                                    buttonText="Edit"
                                    modalComponent={<ReviewCreateEdit book={book} review={review} type='Edit' />} />
                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<ReviewDelete book={book} review={review} />}
                                />
                            </div>
                        ) :
                        ''}

                </div>
            </div>
        </>

    )
}

export default Review