import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

const SignupForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    let myErrors = [];


    const validateForm = () => {

        const validateEmail = (email) => {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        };

        if (!validateEmail(email)) {
            myErrors.push("Please enter a valid email address")
        }


        let nameArr = name.split(' ');

        if (nameArr.length < 2) {
            myErrors.push('Both first and last name are required')
        }

        setErrors([...myErrors])

        return (myErrors.length === 0);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        };

        if (password === confirmPassword) {
            setErrors([]);

            let data = await dispatch(sessionActions.signup({ email, name, password }))
            if (data) {
                setErrors(data)
            } else {
                history.push('/myfeed')
            }
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <>
            <h1 className='signup-form-header'>Sign Up</h1>
            <form className='signup-form' onSubmit={handleSubmit}>
                <ul style={{ listStyle: 'none' }} className="edit-bookshelf-error">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className='signup-form-group'>
                    <label className="signup-form-label">
                        * Email
                        <br></br>
                        <input
                            className='signup-form-input'
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <br></br>
                <div className='signup-form-group'>
                    <label className='signup-form-label'>
                        * Name
                        <br></br>
                        <input
                            className='signup-form-input'
                            placeholder="Both first and last name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <br></br>
                <div className='signup-form-group'>
                    <label className="signup-form-label">
                        * Password
                        <br></br>
                        <input
                            placeholder="At least 6 characters"
                            className='signup-form-input'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <p style={{ marginTop: '5px', marginBottom: '0', fontSize: '10px' }}><i class="fa-solid fa-circle-exclamation"></i> Password must be 6 characters or longer</p>
                    </label>
                </div>
                <br></br>
                <div className='signup-form-group'>
                    <label className='signup-form-label'>
                        * Confirm Password
                        <br></br>
                        <input
                            className='signup-form-input'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <br></br>
                <div className='signup-form-button-container'>
                    <button
                        disabled={!email || !name || !password || (password.length < 6) || !confirmPassword || (confirmPassword !== password)}
                        className={!email || !name || !password || (password.length < 6) || !confirmPassword || (confirmPassword !== password) ? 'disabled-submit' : "signup-form-button"}

                    // className='signup-form-button' type="submit"
                    >
                        Sign Up
                    </button>
                    <p className="login-form-footer">Already a member?<span> </span>
                        <NavLink to="/">Log In!</NavLink>
                    </p>
                </div>
            </form>
        </>
    );
}

export default SignupForm;

