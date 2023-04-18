import { useState } from "react";
import { useDispatch } from "react-redux";
import { createFriend, getFriends, getRequests, removeFriendRequest } from "../../store/friend";

const FriendRequestCard = ({ request }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    const handleAdd = async (e) => {
        e.preventDefault();

        console.log(request)
        try {
            await dispatch(createFriend(request));
            await dispatch(getFriends());
            await dispatch(getRequests());
        }
        catch (response) {
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors);
        }

    }

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await dispatch(removeFriendRequest(request.id));
            await dispatch(getFriends());
            await dispatch(getRequests());
        }
        catch (response) {
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors);
        }

    }

    return (
        <div className='pending-requests-container'>
            <div className='pending-requests-img-username'>
                <img className='request-user-image' src='https://s.gr-assets.com/assets/nophoto/user/u_225x300-c928cbb998d4ac6dd1f0f66f31f74b81.png'></img>
                <p className='pending-requests-para'>{request.User.name}</p>
            </div>

            <div className='pending-requests-buttons'>
                <button className='pending-request-add-btn' onClick={handleAdd}>Accept</button>
                <button className='pending-request-delete-btn' onClick={handleDelete}>Decline</button>
            </div>

        </div>

    )
}

export default FriendRequestCard; 