import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getBookshelves, getBookshelf, updateBookshelf, removeBookshelf } from "../../store/bookshelves";
import "./EditBookshelves.css";

const BookshelvesEditModal = ({ bookshelf, bookshelves }) => {
    const dispatch = useDispatch();
    const history = useHistory();
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

        //let alreadyExists = false;

        for (let shelf of bookshelves) {
            if (shelf.name === newBookshelf.name) {
                err.alreadyExists = "Bookshelf already exists"
            }
        }

        setFormErrors({ ...err });

        return (Object.keys(err).length === 0);
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm(newBookshelf)) {
            return;
        };

        try {
            let edittedBookshelf = await dispatch(updateBookshelf(bookshelf.id, newBookshelf));
            if (edittedBookshelf) {
                await dispatch(getBookshelves());
                await dispatch(getBookshelf(bookshelf.id))
                closeModal();
                history.push(`/shelf/${bookshelf.id}`)
            }
        }
        catch (response) {
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors);
        }
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(removeBookshelf(bookshelf.id));
            history.push('/shelf')
            await dispatch(getBookshelves());
            closeModal();
        }
        catch (response) {
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors);
        }
    }

    return (
        <div className='edit-bookshelf-page'>
            <form className='edit-bookshelf-form'>
                <h1 className='edit-bookshelf-header'>Update "{bookshelf.name}" Bookshelf </h1>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className='edit-bookshelf-form-group'>
                    <span className='edit-bookshelf-form-label'>
                        Bookshelf Name
                    </span>
                    <input style={{ height: '30px' }} className='modal-input'
                        type="text"
                        id="name"
                        name="name"
                        value={newBookshelf.name}
                        onChange={handleUpdate}

                    />
                    <div className='edit-bookshelf-error'>{formErrors.name}</div>
                    <div className='edit-bookshelf-error'>{formErrors.alreadyExists}</div>
                </div>
                <br></br>
                <div>
                    <button
                        disabled={!newBookshelf.name}
                        className={!newBookshelf.name ? "disabled-btn" : "edit-bookshelf-form-button"} type="submit" onClick={handleUpdateSubmit}>Update Bookshelf</button>
                    <button className="edit-bookshelf-form-button" type="submit" onClick={handleDeleteSubmit}>Delete Bookshelf</button>
                    <span onClick={closeModal} className="cancel-button">Cancel</span>
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