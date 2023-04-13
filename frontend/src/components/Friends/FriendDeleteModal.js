import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { createFriendRequest, deleteFriend, getFriends, getRequests } from "../../store/friend";

const FriendDeleteModal = ({ friend }) => {
    console.log(friend);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleYes = async (e) => {
        e.preventDefault();

        try {
            await dispatch(deleteFriend(friend.userId, friend.friendId));
            closeModal();
            await dispatch(getFriends());
            await dispatch(getRequests());

        }
        catch (response) {
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors);
        }
    }

    return (
        <div>
            <form className="form-parent-container">
                <h1 className="review-form-header"> Are you sure you want to delete '{friend.User.name}' as a friend? </h1>
                <button className="edit-bookshelf-form-button" type='submit' style={{ marginTop: '20px' }} onClick={handleYes}>Yes</button>
                <span className='cancel-button' style={{ marginBottom: '20px' }} type="text" onClick={() => closeModal()}>Cancel</span>
            </form>
        </div>

    )


}


export default FriendDeleteModal;