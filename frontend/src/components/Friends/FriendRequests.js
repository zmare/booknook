import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getFriends, getRequests } from '../../store/friend';
import FriendRequestCard from './FriendRequestCard';
import "./Friends.css"

const FriendRequests = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRequests());
    }, [dispatch])

    const requests = useSelector(state => state.friends.allRequests);

    if (!requests) return;


    return (
        <>
            <h1>hello from FriendRequests </h1>
            <p> total requests: {requests.length}</p>
            {requests.map(request => (
                <FriendRequestCard request={request} />
            ))}
        </>


    )
}

export default FriendRequests