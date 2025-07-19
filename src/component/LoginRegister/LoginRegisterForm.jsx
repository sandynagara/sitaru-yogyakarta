import {useState} from 'react'
import './LoginRegisterForm.css'
import RegisterForm from './RegisterForm'
import { AuthService } from '../../service/login'
 
function LoginRegisterForm({setOpen}) {

    const [login, setLogin] = useState(true)

    return (
        <div>
            {login ? AuthService.ssoLogin() : <RegisterForm setOpen={setOpen} setLogin={setLogin}/> } 
        </div>
    )
}

export default LoginRegisterForm
