import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLists, getUserLists } from '../../store/lists';
import FeaturedLists from "./FeaturedLists";
import AllListsCommunity from "./AllListsCommunity";

const Lists = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllLists());
        dispatch(getUserLists());
    }, [dispatch])

    const [name, setName] = useState("")

    const allLists = useSelector(state => state.lists.allLists);
    const userLists = useSelector(state => state.lists.userLists);

    if (!allLists || !userLists) return null;

    let myLists = Object.values(userLists)


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
                        <>
                            <i className="fa-solid fa-trash-can"></i>
                            <NavLink to={`/list/${list.id}`}>{list.name}</NavLink>
                        </>

                    ))}
                    <div>
                        <form >
                            <input
                                placeholder='Add new list'
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}>
                            </input>
                            <button className={!name ? "disabled-add-btn" : "add-button"}>Add</button>
                        </form>
                    </div>
                </div>
                <div className='my-lists'>
                    <FeaturedLists allLists={allLists} />
                    <AllListsCommunity allLists={allLists} />
                </div>
            </div>
        </div>
    )
}

export default Lists; 