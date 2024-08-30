import React,{useState} from 'react'
import './LoginRegisterForm.css'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
 
function LoginRegisterForm({setOpen}) {

    const [login, setLogin] = useState(true)

    return (
        <div>
            {login ? <LoginForm setLogin={setLogin} setOpen={setOpen}/> : <RegisterForm setOpen={setOpen} setLogin={setLogin}/> } 
        </div>
    )
}

export default LoginRegisterForm
