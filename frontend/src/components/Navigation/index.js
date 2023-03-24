import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className='header-container'>
            <li>
                <NavLink className='header-title' exact to="/">bookNook</NavLink>
            </li>
            {isLoaded && (
                <>
                    <div>
                        <ul>
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

                    <div>
                        <input type='text' placeholder='Search'></input>
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </div>
                    <div>
                        <li>Bell</li>
                        <li>Messages</li>
                        <li>Mail</li>
                        <li>Friends</li>
                        <li>
                            <ProfileButton />
                        </li>

                    </div>

                </>

            )
            }
        </ul >
    );
}

export default Navigation;
