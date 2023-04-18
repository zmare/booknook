import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLists, getUserLists, createList, removeList } from '../../store/lists';
import FeaturedLists from "./FeaturedLists";
import AllListsCommunity from "./AllListsCommunity";

const Lists = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllLists());
        dispatch(getUserLists());
    }, [dispatch])

    const [name, setName] = useState("")
    const [errors, setErrors] = useState([]);
    const [formErrors, setFormErrors] = useState({});

    const allLists = useSelector(state => state.lists.allLists);
    const userLists = useSelector(state => state.lists.userLists);

    if (!allLists || !userLists) return null;

    let myLists = Object.values(userLists)

    const validateNewList = () => {
        let lists = Object.values(allLists);
        let err = {};

        if (name.length < 5) {
            err.rightLength = "List name must be 5 characters or more"
        }

        for (let list of lists) {
            if (name === list.name) {
                err.alreadyExists = "List already exists";
            }
        }

        setFormErrors({ ...err });

        return (Object.keys(err).length === 0)
    }

    const handleListDelete = async (list, e) => {
        e.preventDefault();

        try {
            let removedList = await dispatch(removeList(list.id));
            if (removedList) {
                await dispatch(getAllLists());
                await dispatch(getUserLists());
            }
        }
        catch (response) {
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors);
        }
    }

    const handleListAdd = async (e) => {
        e.preventDefault();

        if (!validateNewList()) return;

        try {
            let addedList = await dispatch(createList({ name }));
            if (addedList) {
                await dispatch(getAllLists());
                await dispatch(getUserLists());
                setFormErrors({});
            }
        }
        catch (response) {
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors);
        }


    }

    return (
        <div>
            <div className='friends-nav-container'>
                <div className='friends-nav-title'>
                    Listopia
                </div>
            </div>

            <div className='friends-details-container'>
                <div style={{ width: '300px' }} className='my-requests-sidebar'>
                    <p className='requests-para'>Lists I've Created</p>
                    {myLists.map(list => (
                        <span key={`lists-created-by-me-${list.id}`}>
                            <button onClick={(e) => handleListDelete(list, e)}><i className="fa-solid fa-trash-can"></i></button>
                            <NavLink to={`/list/${list.id}`}>{list.name}</NavLink>
                        </span>

                    ))}
                    <div>
                        <form onSubmit={handleListAdd}>
                            <input
                                placeholder='Add new list'
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}>
                            </input>
                            <div style={{ fontSize: '12px', paddingTop: '5px' }} className="edit-bookshelf-error"> {formErrors.rightLength}</div>
                            <div style={{ fontSize: '12px', paddingTop: '5px' }} className="edit-bookshelf-error"> {formErrors.alreadyExists}</div>
                            <button className={name.length < 5 ? "disabled-add-btn" : "add-button"}>Add</button>
                        </form>
                    </div>
                </div>
                <div className='my-lists'>
                    <FeaturedLists allLists={allLists} />
                    <AllListsCommunity allLists={allLists} />
                </div>
            </div>
        </div >
    )
}

export default Lists; 