import React from 'react'
import { NavLink } from 'react-router-dom'

const Errorpage = () => {
    return (
        <>
            <div id='notfound'>
                <div className='notfound'>
                    <div className='notfound-404'>
                        <h1>404</h1>
                    </div>
                    <h2>Sorry, Page Not found</h2>
                    <p className='mb-5'>The page you are looking might be removed or temporarily unavailable.</p>
                    <NavLink to="/">Back to Home</NavLink>
                </div>
            </div>
        </>
    )
}

export default Errorpage