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

                <NavLink className='header-title' exact to="/">bookNook</NavLink>

                {isLoaded && (
                    <>
                        <div className="nav-menu-container">
                            <ul className='nav-menu-content'>
                                <li>
                                    <NavLink to='/'>Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/shelf'>My Books</NavLink>
                                </li>
                                <li>Browse</li>
                                <li>Community</li>
                            </ul>
                        </div>

                        <div className='nav-search-bar-container'>
                            <input className='nav-search-bar' type='text' placeholder='Search'></input>
                            <button type="submit"><i class="fa fa-search"></i></button>
                        </div>

                        <div className='icons-container'>
                            <li>
                                <img src="https://s.gr-assets.com/assets/layout/header/icn_nav_notifications.svg"></img>
                            </li>
                            <li>
                                <img src="https://s.gr-assets.com/assets/layout/header/icn_nav_discussions.svg"></img>
                            </li>
                            <li>
                                <img src="https://s.gr-assets.com/assets/layout/header/icn_nav_msgs.svg"></img>
                            </li>
                            <li>
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
