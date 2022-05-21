import React,{useState} from 'react'
import './LoginRegisterForm.css'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
 
function LoginRegisterForm({setOpen}) {

    const [login, setLogin] = useState(true)

    return (
        <div className='pop-up'>
            {login ? <LoginForm setLogin={setLogin} setOpen={setOpen}/> : <RegisterForm setOpen={setOpen} setLogin={setLogin}/> } 
            <div className='black-layer' onClick={()=>setOpen(false)}></div>
        </div>
    )
}

export default LoginRegisterForm
