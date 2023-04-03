import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className='header-container'>
            <div className="header-content">
                <NavLink className='header-title' exact to={sessionUser ? "/myfeed" : "/"}><span style={{ fontWeight: 'lighter' }}>book</span><span style={{ fontWeight: 'bolder' }}>nook</span></NavLink>

                {(isLoaded && sessionUser) && (
                    <>
                        <div className="nav-menu-container">
                            <ul className='nav-menu-content'>
                                <NavLink to='/myfeed'>Home</NavLink>
                                <NavLink to='/shelf'>My Books</NavLink>
                            </ul>
                        </div>

                        <div className='nav-search-bar-container'>
                            <input className='nav-search-bar' type='text' placeholder='Search' onClick={(e) => window.alert("Feature coming soon!")}></input>
                            <button className='magnifying-tool' type="submit" onClick={(e) => window.alert("Feature coming soon!")}><i className="fa fa-search"></i></button>
                        </div>

                        <div className='icons-container'>
                            <li onClick={(e) => window.alert("Feature coming soon!")}>
                                <img src="https://s.gr-assets.com/assets/layout/header/icn_nav_notifications.svg"></img>
                            </li >
                            <li onClick={(e) => window.alert("Feature coming soon!")}>
                                <img src="https://s.gr-assets.com/assets/layout/header/icn_nav_discussions.svg"></img>
                            </li>
                            <li onClick={(e) => window.alert("Feature coming soon!")}>
                                <img src="https://s.gr-assets.com/assets/layout/header/icn_nav_msgs.svg"></img>
                            </li>
                            <li onClick={(e) => window.alert("Feature coming soon!")}>
                                <img src="https://s.gr-assets.com/assets/layout/header/icn_nav_friend.svg"></img>
                            </li>
                            <li style={{ paddingRight: '10px' }} >
                                <ProfileButton user={sessionUser} />
                            </li>
                        </div>
                    </>
                )}
            </div>
        </ul >
    );
}

export default Navigation;
