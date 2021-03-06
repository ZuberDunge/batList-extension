import { useState } from "react"
import HeroImage from "./assets/hero.png"
import YTLogo from "./assets/Youtube.png"
import Button from "./button"
import Login from "./user/login"

export default function Main() {

    const [clicked, setClicked] = useState(true)
    return (
        <> {clicked ?
            <div className="main"> <img className="ty-logo" src={YTLogo} alt="" />
                <div className="heading">batList - A watchList extension for YouTube.
                </div>
                <Button onClick={() => setClicked(false)} />

                <div className="parent-div">
                    <img className="hero-img" src={HeroImage} alt="batList" />
                    <div className="app-info">
                        <ul>
                            <li>Log In/ Sing Up using your email</li>
                            <li>Add your favourite video to batList</li>
                            <li>Access it anytime without opening youtube</li>
                        </ul>

                    </div>
                </div>

            </div> : <Login />}
        </>
    )
}