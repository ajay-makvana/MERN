import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState(''); // set default empty
    const [password, setPassword] = useState(''); // set default empty  

    const loginUser = async (e) => {
        e.preventDefault(); // Default reload page off

        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
        )

        const data = res.json();
        // console.log(res);
        // console.log(data);

        if (res.status === 400 || !data) {
            window.alert("Invalid UserCredentials");
        }
        else {
            window.alert("Login Succesfull");

            // after login redirect to Home page
            navigate("/");
        }

    }

    return (
        <>
            <section className='sign-in'>
                <div className='container mt-5 d-flex justify-content-center'>
                    <div className='signin-content'>

                        <h2 className='form-title'>Sign In</h2>

                        <form method='POST' className='signin-form' id="signin-form">

                            <div className='form-group'>
                                <label htmlFor='email'>
                                    <i className='zmdi zmdi-email material-icons-name'></i>
                                </label>
                                <input type='email' name='email' id='email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your Email' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='password'>
                                    <i className='zmdi zmdi-lock material-icons-name'></i>
                                </label>
                                <input type='password' name='password' id='password' autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Your Password' />
                            </div>

                            <div className='form-group form-button'>
                                <input type="submit" name='signin' id='signin' className='form-submit' value="Login" onClick={loginUser} />

                            </div>

                        </form>

                        <div>
                            <NavLink to="/signup" className='signup-link'> Don't have Account ? Register </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;