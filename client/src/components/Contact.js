import React from 'react'

const Contact = () => {
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

                                        <input type='text' id='contact_form_name' className='contact_form_name input_field' placeholder='Your Name' required='true' />
                                        <input type='email' id='contact_form_email' className='contact_form_email input_field' placeholder='Your Email' required='true' />
                                        <input type='number' id='contact_form_phone' className='contact_form_phone input_field' placeholder='Your Phone' required='true' />

                                    </div>
                                </form>

                            </div>

                        </div>
                    </div>
                    <div className='container justify-content-center'>
                        <div className='contact_form_text mt-4'>
                            <textarea className='text_field contact_form_message' placeholder='Message' cols="30" rows="5" />
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center align-items-center'>
                        <div className='contact_form_button'>
                            <button type='submit' className='button contact_submit_button'>Submit</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Contact;