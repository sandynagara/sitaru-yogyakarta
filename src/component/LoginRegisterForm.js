import React,{useState,createRef,forwardRef,useRef} from 'react'
import './LoginRegisterForm.css'
import  {AiOutlineUser ,AiOutlineLock,AiOutlineContacts,AiOutlineClose} from 'react-icons/ai'
import  {BsPhone} from 'react-icons/bs'
import {FaRegAddressBook} from "react-icons/fa"
import configData from "./config.json"
import Swal from 'sweetalert2'

const InputLoginRegister = forwardRef(({tipe,label,logo,ganti},ref) => {

    const [active, setActive] = useState(false)

    return(<div style={{marginTop:"20px"}}>
        <div className="logo-input" style={active ? {color : "#1983ec"} : {color : "grey"}}>
            {logo}
        </div>
        <input name={label} onChange={ganti} ref={ref} placeholder={label} type={tipe} onFocus={()=>setActive(true)} onBlur={()=>setActive(false)}/>
    </div>
    )
})

function RegisterForm({setLogin,setOpen}){

    const [usernameCheck, setUsernameCheck] = useState(false)

    const namaLengkapInput = createRef();
    const usernameInput = createRef();
    const alamatInput = createRef();
    const hpInput = createRef();
    const passwordInput = createRef();
    const confirmPasswordInput = createRef();
    const buttonRegister = useRef()

    const checkChange = (e) => {
        if(e.target.name == "Username"){
            var url = configData.SERVER_API + "user/check/" + e.target.value
            fetch(url)
            .then(res => res.json())
            .then(hasil => setUsernameCheck(!hasil))
        }
        const username = usernameInput.current.value
        const password = passwordInput.current.value
        const namaLengkap = namaLengkapInput.current.value
        const alamat = alamatInput.current.value
        const hp = hpInput.current.value
        if(checkPassword() && username != "" && password != "" && namaLengkap != "" && alamat != "" && confirmPasswordInput != ""){
            buttonRegister.current.disabled=false
            buttonRegister.current.style.backgroundColor = "#1983ec"
            buttonRegister.current.style.cursor = "pointer"
        }else{
            buttonRegister.current.disabled=true
            buttonRegister.current.style.backgroundColor = "rgb(180, 210, 248)"
            buttonRegister.current.style.cursor = ""
        }
    } 

    const checkPassword =() => {
        const password = passwordInput.current.value
        const passwordConfirm = confirmPasswordInput.current.value
        if(password === passwordConfirm){
            return true
        }else{
            return false
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(usernameInput)
        const username = e.target["Username"].value
        const password = e.target["Password"].value
        const namaLengkap = e.target["Nama Lengkap"].value
        const alamat = e.target["Alamat"].value
        const noHp = e.target["Nomor Handphone (Opsional)"].value
        const url = configData.SERVER_API + "user"
        fetch(url,{
            method: 'POST',
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },body: JSON.stringify({
              username: username,
              alamat: alamat,
              namaLengkap:namaLengkap,
              password:password,
              noHp:noHp
            }),
          })
          .then((respond) => respond.json())
          .then((hasil) =>{
            if(hasil.RTN){
                setLogin(true)
                Swal.fire({
                    icon: 'success',
                    title:'Akun berhasil dibuat',
                    timer: 2000,
                    }
                )
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Maaf',
                    text: 'Akun gagal dibuat',
                })
            }
          })
          .catch((err)=>{
            console.log(err,"err")
          });
    }

    return (
        <div className="login-container">
            <div style={{width:"100%",display:"flex",padding:0,minWidth:"100%",justifyContent:"justify-between",alignItems:"center"}}>
                <h2 style={{width:"100%"}}>Register</h2>
                <AiOutlineClose style={{cursor:"pointer"}} size={22} color="red" onClick={()=>setOpen(true)}/>
            </div>
              
            <form onSubmit={(e)=> submitHandler(e)}>
                <InputLoginRegister tipe="text" ganti={checkChange} ref={namaLengkapInput} label="Nama Lengkap" logo={<AiOutlineContacts/>}/>
                <div>
                    <InputLoginRegister tipe="text" ganti={checkChange} ref={usernameInput} label="Username" logo={<AiOutlineUser/>}/>
                    {usernameCheck && <p style={{fontSize:"12px",color:"red",position:"absolute"}}>Maaf, Username sudah digunakan</p>} 
                </div>
                <InputLoginRegister tipe="text" ganti={checkChange} ref={alamatInput} label="Alamat" logo={<FaRegAddressBook/>}/>
                <InputLoginRegister tipe="text" ganti={checkChange} ref={hpInput} label="Nomor Handphone (Opsional)" logo={<BsPhone/>}/>
                <InputLoginRegister tipe="password" ganti={checkChange} ref={passwordInput} label="Password" logo={<AiOutlineLock/>}/>
                <InputLoginRegister tipe="password" ganti={checkChange} ref={confirmPasswordInput} label="Confirm password" logo={<AiOutlineLock/>}/>
                <button type="submit" ref={buttonRegister}>Register </button>
            </form>
            <div className='register-link'>
                <p>Sudah punya akun?</p>
                <p className='to-register' onClick={()=>setLogin(true)}>Login</p>
            </div>
        </div>
    )
}

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
        console.log(password)
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
