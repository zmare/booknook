import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getFriends } from '../../store/friend';
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
                </li>
            ))}
        </>


    )
}

export default FriendList