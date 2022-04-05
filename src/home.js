/* global chrome */
import App from "./App";
import YTLogo from "./assets/Youtube.png"
import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "./context/data";
import Footer from "./footer";
import Main from "./main";

export default function Home() {
    const { isLoggedIn, setIsLoggedIn } = useContext(ListContext)
    const auth = getAuth();
    const user = auth.currentUser;
    let newUserID = JSON.parse(localStorage.getItem('userID'))

    useEffect(() => {
        newUserID = JSON.parse(localStorage.getItem('userID'))
        console.log(newUserID);
        if (newUserID != null) {
            setIsLoggedIn(true)
            console.log(newUserID);
        } else {
            setIsLoggedIn(false)
            console.log(newUserID);
        }
    }, [isLoggedIn])




    return (<>
        {navigator.onLine ? (isLoggedIn ? <App /> : <Main />) : <h3>You're offline</h3>}
        <Footer />
    </>)
}