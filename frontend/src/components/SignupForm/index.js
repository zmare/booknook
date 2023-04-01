import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

const SignupForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    // const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, name, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
                .then(
                    history.push('/')
                );
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };



    return (
        <>
            <h1 className='signup-form-header'>Sign Up</h1>
            <form className='signup-form' onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className='signup-form-group'>
                    <label className="signup-form-label">
                        Email
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
                        Name
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
                {/* <label>
                    Last Name
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label> */}
                <div className='signup-form-group'>
                    <label className="signup-form-label">
                        Password
                        <br></br>
                        <input
                            placeholder="At least 6 characters"
                            className='signup-form-input'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {/* <p> <i className="fas fa-circle-exclamation" /> </p> */}
                        <p style={{ marginTop: '5px', marginBottom: '0', fontSize: '10px' }}><i class="fa-solid fa-circle-exclamation"></i> Password must be 6 characters or longer</p>
                    </label>
                </div>
                <br></br>
                <div className='signup-form-group'>
                    <label className='signup-form-label'>
                        Confirm Password
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
                    <button className='signup-form-button' type="submit">Sign Up</button>
                    <p className="login-form-footer">Already a member?<span> </span>
                        <NavLink to="/">Log In!</NavLink>
                    </p>
                </div>
            </form>
        </>
    );
}

export default SignupForm;

