import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Signup = () => {

    //useNavigate hook for after registration login
    const navigate = useNavigate();

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
        // console.log(e);
        name = e.target.name; // name of inputfield which is typing
        value = e.target.value; // value of inputfield which is typing

        // using spread operator required user all data
        // here get dynamic data 'name'
        setUser({ ...user, [name]: value });
        // setting the name field value to value in 
    };

    const PostData = async (e) => {
        e.preventDefault(); // automatic form reload stopping
        const { name, email, phone, work, password, cpassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                // if both key value pair has same name no need to write:)
                "name": name,
                "email": email,
                "phone": phone,
                "work": work,
                "password": password,
                "cpassword": cpassword
            })
        });

        const data = await res.json();
        // console.log(res);
        // console.log(data);
        
        if (res.status === 422 || !data) {
            window.alert("Invalid Registration");
        }
        else {
            window.alert("Registration Done Succesfully");

            // after registration make user login
            navigate("/login");
        }
    };

    return (
        <>
            <section className='signup'>
                <div className='container mt-5 d-flex justify-content-center'>
                    <div className='signup-content'>

                        <h2 className='form-title'>Sign Up</h2>

                        <form method='POST' className='register-form' id="register-form">

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
                                <input type="submit" name='sigunp' id='signup' className='form-submit' value="register" onClick={PostData} />

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