import React from 'react'
import { NavLink } from 'react-router-dom'

const Signup = () => {
    return (
        <>
            <section className='signup'>
                <div className='container mt-5 d-flex justify-content-center'>
                    <div className='signup-content'>

                        <h2 className='form-title'>Sign Up</h2>

                        <form className='register-form' id="register-form">

                            <div className="form-group">
                                <label htmlFor='name'>
                                    <i className='zmdi zmdi-account material-icons-name'></i>
                                </label>
                                <input type='text' name='name' id='name' autoComplete='off' placeholder='Your Name' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='email'>
                                    <i className='zmdi zmdi-email material-icons-name'></i>
                                </label>
                                <input type='email' name='email' id='email' autoComplete='off' placeholder='Your Email' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='phone'>
                                    <i className='zmdi zmdi-phone-in-talk material-icons-name'></i>
                                </label>
                                <input type='number' name='phone' id='phone' autoComplete='off' placeholder='Your Phone' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='work'>
                                    <i className='zmdi zmdi-slideshow material-icons-name'></i>
                                </label>
                                <input type='text' name='work' id='work' autoComplete='off' placeholder='Your Work' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='password'>
                                    <i className='zmdi zmdi-lock material-icons-name'></i>
                                </label>
                                <input type='password' name='password' id='password' autoComplete='off' placeholder='Your Password' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='cpassword'>
                                    <i className='zmdi zmdi-lock material-icons-name'></i>
                                </label>
                                <input type='password' name='cpassword' id='cpassword' autoComplete='off' placeholder='Confirm Password' />
                            </div>

                            <div className='form-group form-button'>
                                <input type="submit" name='sigunp' id='signup' className='form-submit' value="Register" />

                            </div>

                        </form>

                        <div>
                            <NavLink to="/login" className='signin-link'> I am already register </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup;