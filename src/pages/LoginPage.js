import React from 'react'
import './LoginPage.css'
import background from '../images/background.webp'
import LoginForm from '../component/LoginForm'

function LoginPage() {
    return (
        <div className="login-page" >
            <img src={background} alt=""/>
            <LoginForm/>
        </div>
    )
}

export default LoginPage
