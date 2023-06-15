import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigation = useNavigate();

    // using promises, but also can using async-await
    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: "application/json", // comment this line still working
                "Content-Type": "application/json",
            },
            credentials: "include" // comment this line still working
        }).then((res) => {
            // replace = true means compulsury send to '/login' and user can't go back in browser
            navigation("/login", { replace: true });
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        })
    });

    return (
        <>
        </>
    )
}

export default Logout