import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./EditBookshelves.css";

const BookshelvesEditModal = ({ bookshelf }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [newBookshelf, setNewBookshelf] = useState({ ...bookshelf })
    const [errors, setErrors] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const { closeModal } = useModal();

    const handleUpdate = async (e) => {
        setNewBookshelf({ ...newBookshelf, [e.target.name]: e.target.value })
    }

    const validateForm = () => {
        let err = {};

        if (newBookshelf.name === '') {
            err.name = 'Bookshelf Name is required';
        }

        setFormErrors({ ...err });

        return (Object.keys(err).length === 0);
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm(newBookshelf)) {
            return;
        };

        // try {
        //     let edittedServer = await dispatch(editServer(server.id, newServer));
        //     if (edittedServer) {
        //         await dispatch(getServers(user));
        //         await dispatch(getServer(serverId));
        //         closeModal();
        //     }
        // }
        // catch (response) {
        //     const data = await response.json();
        //     if (data && data.errors) setErrors(data.errors);
        // }
    };

    const handleDeleteSubmit = async (e) => {

    }

    return (
        <div className='edit-server-page'>
            <form className='edit-server-form' onSubmit={handleSubmit}>
                <h1 className='edit-server-header'>Update "{bookshelf.name}"     Bookshelf </h1>

                <div className='edit-server-form-group'>
                    <span className='edit-server-form-label'>
                        Bookshelf Name
                    </span>
                    <input style={{ height: '30px' }} className='modal-input'
                        type="text"
                        id="name"
                        name="name"
                        value={newBookshelf.name}
                        onChange={handleUpdate}

                    />
                    <div className='edit-server-error'>{formErrors.name}</div>
                </div>
                <br></br>
                <div>
                    <button
                        disabled={!newBookshelf.name}
                        className={!newBookshelf.name ? "disabled-btn" : "edit-server-form-button"} type="submit">Update Bookshelf</button>
                    <button className={!newBookshelf.name ? "disabled-btn" : "edit-server-form-button"} type="submit">Delete Bookshelf</button>
                    <span onClick={closeModal} className="channel-update-form-cancel">Cancel</span>
                </div>
            </form >
        </div >

    )
}

export default BookshelvesEditModal


//        // <ul>
                //     {errors.map((error, idx) => (
                //         <li key={idx}>{error}</li>
                //     ))}
                // </ul>