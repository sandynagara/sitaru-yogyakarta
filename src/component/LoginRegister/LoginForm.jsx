import React,{useState} from 'react'
import  {AiOutlineUser ,AiOutlineLock,AiOutlineClose} from 'react-icons/ai'

import Swal from 'sweetalert2'
import Modal from '@mui/material/Modal';
import InputLoginRegister from './InputLoginRegister'

function LoginForm({setLogin,setOpen,open}){

    const [username, setusername] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = (event) =>{
        event.preventDefault();
        if(username === ""){
            alert("Username tidak boleh kosong")
        }else if(password === ""){
            alert("Password tidak boleh kosong")
        }else{
            const url = process.env.REACT_APP_BASE_URL + "login"
            fetch(url,{method:"POST", 
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },body: JSON.stringify({
                username: username,
                password: password
              }),
              credentials: 'include',
            })
            .then(res=>res.json())
            .then(hasil=>{
                if(hasil.RTN){
                    setOpen(false)
                    setLogin(true)
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
        <Modal open={open}
            onClose={()=>setOpen(!open)}
        >
            <div className='fixed bg-black bg-opacity-60 top-0 w-screen h-screen items-center flex justify-center'>
                <div className="login-container">
                    <div style={{width:"100%",display:"flex",padding:0,minWidth:"100%",justifyContent:"justify-between",alignItems:"center"}}>
                        <h2 style={{width:"100%"}} className="font-bold">Login</h2>
                        <AiOutlineClose style={{cursor:"pointer"}} size={22} color="red" onClick={()=>setOpen(false)}/>
                    </div>
                    <form onSubmit={(e)=> submitHandler(e)}>
                        <InputLoginRegister onChange={(e)=>setusername(e.target.value)} tipe="text" label="Username" logo={<AiOutlineUser/>}/>
                        <InputLoginRegister onChange={(e)=>setPassword(e.target.value)} tipe="password" label="Password" logo={<AiOutlineLock/>}/>
                        <button type="submit" className='p-2'>Login </button>
                    </form>
                    {/* <div className='register-link'>
                        <p>Belum punya akun?</p>
                        <p className='to-register' onClick={()=>setLogin(false)}>Register</p>
                    </div> */}
                </div>
            </div> 
        </Modal>
    )
} 

export default LoginForm