import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Homepage() {
    const user = useSelector(state => state.session.user);

    return (
        <h1>hello from homepage component! </h1>

    );
}

export default Homepage;