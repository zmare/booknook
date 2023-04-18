import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { createFriendRequest, getFriends, getRequests } from "../../store/friend";

const FriendAddModal = ({ friend }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleYes = async (e) => {
        e.preventDefault();

        try {
            await dispatch(createFriendRequest(friend.id));
            await dispatch(getFriends());
            await dispatch(getRequests());
            closeModal();
        }
        catch (response) {
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors);
        }
    }

    return (
        <div>
            <form className="form-parent-container">
                <h1 className="review-form-header"> Do you want to send '{friend.name}' a friend request? </h1>
                <button className="edit-bookshelf-form-button" type='submit' style={{ marginTop: '20px' }} onClick={handleYes}>Yes</button>
                <span className='cancel-button' style={{ marginBottom: '20px' }} type="text" onClick={() => closeModal()}>Cancel</span>
            </form>
        </div>

    )


}


export default FriendAddModal