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
        <div style={{ display: 'flex' }}>
            <li>{request.User.name}</li>
            <button onClick={handleDelete}><i className="fa-solid fa-trash-can"></i></button>
        </div>
    )
}

export default FriendsPendingCard