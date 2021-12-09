import React,{useState} from 'react'
import './LoginForm.css'
import  {AiOutlineUser ,AiOutlineLock} from 'react-icons/ai'
import { Link ,Navigate } from 'react-router-dom'

function InputLogin({tipe,label,logo}){

    const [active, setActive] = useState(false)

    return(<div style={{marginTop:"30px"}}>
        <p>{label}</p>
        <div className="logo-input" style={active ? {color : "#673AB7"} : {color : "grey"}}>
            {logo}
        </div>
        <input name={label} placeholder={label} type={tipe} onFocus={()=>setActive(true)} onBlur={()=>setActive(false)}/>
    </div>
    )
}

function LoginForm() {

    const [loginSuccess, setLoginSuccess] = useState(false)

    var submitHandler = (event) =>{
        event.preventDefault();
      
        var username = event.target.Username.value
        var password = event.target.Password.value
        if(username === ""){
            alert("Username tidak boleh kosong")
        }else if(password === ""){
            alert("Password tidak boleh kosong")
        }else{
            localStorage.setItem("username", username);
            setLoginSuccess(true)
        }
        console.log(password)
    }

    return (
        <div className="login-container">
           {loginSuccess && (<Navigate to="/"/>)}
          <h2> Login</h2>
          <form onSubmit={(e)=> submitHandler(e)}>
              <InputLogin tipe="text" label="Username" logo={<AiOutlineUser/>}/>
              <InputLogin tipe="password" label="Password" logo={<AiOutlineLock/>}/>
              <button type="submit">Login </button>
          </form>
          <Link to="/">
            <div className="back-home">
                <p>Back to Dashboard</p>
            </div>
          </Link>
        </div>
    )
}

export default LoginForm
