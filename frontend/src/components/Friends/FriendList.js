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
        <>
            <h1>hello from friendlist </h1>
            <p> total friends: {friends.length}</p>
            {friends.map(friend => (
                <li>
                    {friend.User.name}
                    <OpenModalButton
                        buttonText={<i className="fa-solid fa-trash-can"></i>}
                        modalComponent={<FriendDeleteModal friend={friend} />}
                    />
                </li>
            ))}
        </>


    )
}

export default FriendList