import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../../store/friend';
import OpenModalButton from '../OpenModalButton';
import FriendDeleteModal from './FriendDeleteModal';
import "./Friends.css"

const FriendList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriends());
    }, [dispatch])

    const friends = useSelector(state => state.friends.allFriends);

    if (!friends) return;


    return (
        <div className='friendlist-container'>
            <p className='requests-para'> You have {friends.length} {friends.length === 1 ? 'friend' : 'friends'}! </p>
            {friends.map(friend => (
                <li id={`friend-card-id-${friend.id}`} className='friendlist-card'>
                    <OpenModalButton
                        buttonText={<i className="fa-solid fa-trash-can"></i>}
                        modalComponent={<FriendDeleteModal friend={friend} />}
                    />
                    <img className='friendlist-user-image' src='https://s.gr-assets.com/assets/nophoto/user/u_225x300-c928cbb998d4ac6dd1f0f66f31f74b81.png'></img>
                    <p className='pending-requests-para'>{friend.User.name}</p>


                </li>
            ))
            }
        </div >
    )
}

export default FriendList