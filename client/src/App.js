import React, { useState, useEffect } from "react"
import Intro from "./components/Intro"
import Profile from "./components/Profile"
import { token } from "./utils"
import { logout } from "./utils"

export default function App() {
    const [accessToken, setAccessToken] = useState('')

    useEffect(() => {
        setAccessToken(token)
    }, [])

    return (
        <div>
            {accessToken ? 
                <div className="main">
                    <Profile logout={logout} />
                </div> : 
                <div className="intro--cont">
                    <Intro />
                </div>
            }
        </div>
    )
}
