import React, { useEffect, useState } from 'react'
import profilepic from '../images/profilepic.png'
import { useNavigate } from 'react-router-dom'

const About = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {
            const resFromBackend = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                // if we want to send cookies or token then this credentials must to write
                credentials: "include"
            })

            const data = await resFromBackend.json();
            // console.log(data);

            setUserData(data);

            if (!resFromBackend.status === 200) {
                const error = new Error(resFromBackend.error);
                console.log(error);
                throw error;
            }
        }
        catch (err) {
            console.log(err);

            // user Not logedIn so we got error so redirect user to login
            navigate('/login');
        }
    }

    // whenever page load first time callAboutPage() function will called
    // it will check as user already loggedIn then show about page content or redirect to login page
    useEffect(() => {
        callAboutPage();
    }, []);

    return (
        <>
            <div className='container profile mt-3'>
                <form method=''>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='profile-img'>
                                <img src={profilepic} alt="Profile Picture" />
                            </div>
                        </div>

                        <div className='col-md-6'>
                            <div className='profile_head'>
                                <h5>{userData.name}</h5>
                                <h6>{userData.work}</h6>
                                <p className='profile_rating mt-3 mb-5'>Ratings <span>1/10</span></p>

                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">About</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab">TimeLine</a>
                                    </li>
                                </ul>
                            </div>

                        </div>

                        <div className='cold-md-2'>
                            <input type='text' className='profile-edit-btn' name="btnAndMore" value="Edit Profile" />
                        </div>

                    </div>

                    <div className='row mt-2'>
                        {/* Left Side WebLink */}
                        <div className='col-md-4'>
                            <div className='profile_work'>
                                <p>WorkLink</p>
                                <a href='#' target='_ajay'>YT</a><br />
                                <a href='#' target='_ajay'>FB</a><br />
                                <a href='#' target='_ajay'>INSTA</a><br />
                            </div>
                        </div >

                        {/* Right Side Toggle Data */}
                        <div className='col-md-8 pl-8'>
                            <div className='tab-content profile-tab' id='myTabContent'>

                                <div className='tab-pane fade show active' id='home' role='tabpanel' aria-labelledby='home-tab'>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>UserId</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData._id} </p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Name</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.name} </p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Email</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.email} </p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Phone</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.phone} </p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Profession</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.work} </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='tab-pane fade' id='profile' role='tabpanel' aria-labelledby='profile-tab'>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Experience</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>TempData </p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Hourly rate</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>TempData </p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Total Projects</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>TempData </p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>English Level</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>TempData </p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Availability</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>TempData </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div >
                </form >
            </div >
        </>
    )
}

export default About