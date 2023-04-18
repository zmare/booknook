import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { createFriendRequest, getFriends, getRequests, removeFriendRequest } from "../../store/friend";

const FriendsPendingCard = ({ request }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

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
        <div style={{ display: 'flex', listStyle: 'none' }}>
            <button className='button-trash-requests-list' onClick={handleDelete}>
                <i className="fa-solid fa-trash-can"></i>
            </button>
            <img className='request-user-image' src='https://s.gr-assets.com/assets/nophoto/user/u_225x300-c928cbb998d4ac6dd1f0f66f31f74b81.png'></img>
            <li className='request-user-name'>{request.User.name}</li>
        </div>
    )
}

export default FriendsPendingCard