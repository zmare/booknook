import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getFriends, getRequests } from '../../store/friend';
import FriendRequestCard from './FriendRequestCard';
import "./Friends.css"
import FriendsPendingCard from './FriendsPendingCard';

const FriendRequests = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRequests());
    }, [dispatch])

    const requests = useSelector(state => state.friends.allRequests);
    const pending = useSelector(state => state.friends.allPending);

    if (!requests || !pending) return;


    return (
        <>
            <h1>hello from FriendRequests </h1>
            <p> You've sent {pending.length} requests to the following people and are waiting to hear back! </p>
            {pending.map(request => (
                <FriendsPendingCard request={request} />
            ))
            }
            <br></br>
            <p> total requests waiting on a response from you: {requests.length}</p>
            {
                requests.map(request => (
                    <FriendRequestCard request={request} />
                ))
            }
        </>


    )
}

export default FriendRequests