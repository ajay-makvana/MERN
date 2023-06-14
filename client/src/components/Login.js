import React from 'react'
import { NavLink } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <section className='sign-in'>
                <div className='container mt-5 d-flex justify-content-center'>
                    <div className='signin-content'>

                        <h2 className='form-title'>Sign In</h2>

                        <form className='signin-form' id="signin-form">

                            <div className='form-group'>
                                <label htmlFor='email'>
                                    <i className='zmdi zmdi-email material-icons-name'></i>
                                </label>
                                <input type='email' name='email' id='email' autoComplete='off' placeholder='Your Email' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='password'>
                                    <i className='zmdi zmdi-lock material-icons-name'></i>
                                </label>
                                <input type='password' name='password' id='password' autoComplete='off' placeholder='Your Password' />
                            </div>

                            <div className='form-group form-button'>
                                <input type="submit" name='signin' id='signin' className='form-submit' value="Login" />

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