import React, { useEffect } from 'react';
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

    const allLists = useSelector(state => state.lists.allLists);
    const userLists = useSelector(state => state.lists.userLists);

    if (!allLists || !userLists) return null;



    return (
        <div>
            <div className='friends-nav-container'>
                <div className='friends-nav-title'>
                    Listopia
                </div>
            </div>

            <div className='friends-details-container'>
                <div className='my-requests-sidebar'>
                    Manage Your Lists
                </div>
                <div className='my-friendlist'>
                    <FeaturedLists allLists={allLists} />
                    <AllListsCommunity allLists={allLists} />
                </div>
            </div>
        </div>
    )
}

export default Lists; 