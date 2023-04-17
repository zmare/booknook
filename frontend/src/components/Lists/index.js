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
        <>
            <h2>Listopia</h2>
            <FeaturedLists allLists={allLists} />
            <AllListsCommunity allLists={allLists} />
        </>

    )
}

export default Lists; 