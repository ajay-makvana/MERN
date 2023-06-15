import React, { useEffect, useState } from 'react'

const Home = () => {

    // don't need all field get from '/getdata' so only put that required
    const [userName, setUserName] = useState('');

    const [userLogged, setUserLogged] = useState(false);

    const userHomePage = async () => {
        try {
            const resFromBackend = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const data = await resFromBackend.json();

            setUserName(data.name);
            setUserLogged(true);

            if (!resFromBackend.status === 200) {
                const error = new Error(resFromBackend.error);
                console.log(error);
                throw error;
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    // whenever page load first time callHomePage() function will called
    useEffect(() => {
        userHomePage();
    }, []);

    return (
        <>
            <div className='home_page'>
                <div className='home_div'>
                    <p className='pt-5'>Welcome</p>
                    <h1>{userName}</h1>
                    <h2>{userLogged ? "Happy to see you Here" : "We are MERN Developer"}</h2>
                </div>
            </div>
        </>

    )
}

export default Home