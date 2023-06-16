import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Logout = () => {

    const { state, dispatch } = useContext(UserContext);

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

            dispatch({ type: "USER", payload: false });

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