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
        <>
            <p>{request.User.name}</p>
            <button onClick={handleAdd}>Accept</button>
            <button onClick={handleDelete}>Decline</button>
        </>

    )
}

export default FriendRequestCard; 