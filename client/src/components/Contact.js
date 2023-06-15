import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Contact = () => {

    const navigate = useNavigate();

    // don't need all field get from '/getdata' so only put that required
    const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

    const userContact = async () => {
        try {
            const resFromBackend = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const data = await resFromBackend.json();
            // console.log(data);

            // set some field if user already login than this field are already stored on DB so used that
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

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
        userContact();
    }, []);

    // storing data in userData

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        // set name, email, phone number from available data of loggedUser, only message field will need to change
        setUserData({ ...userData, [name]: value });
    }

    //send data to backEnd
    const contactForm = async (e) => {
        e.preventDefault(); // stopping auto form refresh

        const { name, email, phone, message } = userData;

        const res = await fetch('/contact', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();
        if (!data || res.status === 400) {
            alert("Message Not Send");
        }
        else {
            alert("Message Send");
            // after sending message message field will be clear
            setUserData({ ...userData, message: "" });
        }

    };


    return (
        <>
            {/* General Info showing */}
            <div className='contact_info'>
                <div className='container-fluid'>
                    <div className='row mx-auto'>
                    </div>
                </div>
            </div>

            {/* Contact Us form */}

            <div className='contact_form'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-10 offset-lg-1'>
                            <div className='contact_form_container py-5'>

                                <div className='contact_form_title'>
                                    Get in Touch
                                </div>

                                <form id="contact_form">
                                    <div className='d-flex justify-content-between align-items-between contact_form_name'>

                                        <input type='text' id='contact_form_name' className='contact_form_name input_field' placeholder='Your Name' required='true' name="name" value={userData.name} onChange={handleInput} />
                                        <input type='email' id='contact_form_email' className='contact_form_email input_field' placeholder='Your Email' required='true' name="email" value={userData.email} onChange={handleInput} />
                                        <input type='number' id='contact_form_phone' className='contact_form_phone input_field' placeholder='Your Phone' required='true' name="phone" value={userData.phone} onChange={handleInput} />

                                    </div>
                                </form>

                            </div>

                        </div>
                    </div>
                    <div className='container justify-content-center'>
                        <div className='contact_form_text mt-4'>
                            <textarea className='text_field contact_form_message' placeholder='Message' cols="30" rows="5" name="message" value={userData.message} onChange={handleInput} />
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center align-items-center'>
                        <div className='contact_form_button'>
                            <button type='submit' className='button contact_submit_button' onClick={contactForm}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Contact;