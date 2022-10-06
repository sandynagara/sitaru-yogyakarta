import React from 'react'
import  {AiOutlineUser ,AiOutlineLock,AiOutlineClose} from 'react-icons/ai'
import configData from "../config.json"
import Swal from 'sweetalert2'
import InputLoginRegister from './InputLoginRegister'

function LoginForm({setLogin,setOpen}){
    var submitHandler = (event) =>{
        event.preventDefault();
        var username = event.target.Username.value
        var password = event.target.Password.value
        if(username === ""){
            alert("Username tidak boleh kosong")
        }else if(password === ""){
            alert("Password tidak boleh kosong")
        }else{
            const url = configData.SERVER_API + "login"
            fetch(url,{method:"POST", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },body: JSON.stringify({
                username: username,
                password: password
              }),
              credentials: 'include'
            })
            .then(res=>res.json())
            .then(hasil=>{
                if(hasil.RTN){
                    setOpen(false)
                    Swal.fire({
                        icon: 'success',
                        title:'Anda berhasil login',
                        timer: 2000,
                        }
                    )
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Maaf',
                        text: 'Username / Password yang anda masukkan salah',
                    })
                }
            }).catch((err)=>console.log(err))
        }
    }

    return (
        <div className="login-container">
            <div style={{width:"100%",display:"flex",padding:0,minWidth:"100%",justifyContent:"justify-between",alignItems:"center"}}>
                <h2 style={{width:"100%"}}>Login</h2>
                <AiOutlineClose style={{cursor:"pointer"}} size={22} color="red" onClick={()=>setOpen(true)}/>
            </div>
            <form onSubmit={(e)=> submitHandler(e)}>
                <InputLoginRegister tipe="text" label="Username" logo={<AiOutlineUser/>}/>
                <InputLoginRegister tipe="password" label="Password" logo={<AiOutlineLock/>}/>
                <button type="submit">Login </button>
            </form>
            <div className='register-link'>
                <p>Belum punya akun?</p>
                <p className='to-register' onClick={()=>setLogin(false)}>Register</p>
            </div>
        </div>
    )
} 

export default LoginForm