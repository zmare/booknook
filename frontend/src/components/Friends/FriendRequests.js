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
            <p className='requests-para'>Requests Sent</p>
            <p className='requests-sub-para'> You've sent <span style={{ fontWeight: 'bolder' }}>{pending.length} {pending.length === 1 ? 'request' : 'requests'}</span>  to the following people and are waiting to hear back! </p>
            {
                pending.map(request => (
                    <FriendsPendingCard id={`request-id-${request.id}`} request={request} />
                ))
            }
            <br></br>
            <p className='requests-para'> Requests Waiting for a Response</p>
            {
                requests.map(request => (
                    <FriendRequestCard id={`request-card-id-${request.id}`} request={request} />
                ))
            }
        </>

    )
}

export default FriendRequests