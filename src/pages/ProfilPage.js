import React from 'react'
import './ProfilPage.css'
import background from '../images/background.webp'
import { Link } from 'react-router-dom'

function ProfilPage() {

    console.log(localStorage.getItem("username"))

    return (
        <div className="profile-page">     
            <img src={background} alt=""/>
            <div className="profile-container">
                <img  alt=""/>
                 <p><b>Sandy Setyanagara</b></p>
                <div>
                <p>Teknik Geodesi</p>
                </div>
                <Link to="/">
                <button className="sign-out" onClick={()=>localStorage.removeItem("username")}>
                    Sign Out
                </button>
                </Link>
                <Link to="/">
                    <div className="back-home">
                        <p>Back to Dashboard</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ProfilPage
