import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Signup = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: ""
    });


    let name, value; //{ key, value } pair
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name; // name of inputfield which is typing
        value = e.target.value; // value of inputfield which is typing

        // using spread operator required user all data
        // here get dynamic data 'name'
        setUser({ ...user, [name]: value });
        // setting the name field value to value in 
    }

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
                                <input type='text' name='name' id='name' autoComplete='off' value={user.name} onChange={handleInputs} placeholder='Your Name' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='email'>
                                    <i className='zmdi zmdi-email material-icons-name'></i>
                                </label>
                                <input type='email' name='email' id='email' autoComplete='off' value={user.email} onChange={handleInputs} placeholder='Your Email' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='phone'>
                                    <i className='zmdi zmdi-phone-in-talk material-icons-name'></i>
                                </label>
                                <input type='number' name='phone' id='phone' autoComplete='off' value={user.phone} onChange={handleInputs} placeholder='Your Phone' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='work'>
                                    <i className='zmdi zmdi-slideshow material-icons-name'></i>
                                </label>
                                <input type='text' name='work' id='work' autoComplete='off' value={user.work} onChange={handleInputs} placeholder='Your Work' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='password'>
                                    <i className='zmdi zmdi-lock material-icons-name'></i>
                                </label>
                                <input type='password' name='password' id='password' autoComplete='off' value={user.password} onChange={handleInputs} placeholder='Your Password' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='cpassword'>
                                    <i className='zmdi zmdi-lock material-icons-name'></i>
                                </label>
                                <input type='password' name='cpassword' id='cpassword' autoComplete='off' value={user.cpassword} onChange={handleInputs} placeholder='Confirm Password' />
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