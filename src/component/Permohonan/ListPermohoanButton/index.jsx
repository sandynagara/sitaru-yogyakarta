import React,{useState} from 'react'
import {FaClipboardList} from "react-icons/fa"

import LoginForm from '../../LoginRegister/LoginForm'
import {AiOutlineForm} from "react-icons/ai"

function ListPermohonanButton({setMode,mode}) {

    const [open, setOpen] = useState(false)
    const [login, setLogin] = useState(false)

    const clickHandle = async () => {

        if(mode == "listform" ){
          setMode("form")
          return
        }

        if(open){
          return
        }

        try{
          var url = process.env.REACT_APP_BASE_URL+"user/check"
          let response = await fetch(url,{credentials:'include'})
          response = await response.json()
          if(response !== "unauthorized"){
            setMode("listform")
          }else{
            setOpen(true)
          }
        }catch (error) {
          console.log(error);
        }
       
    }

  return (
    <div className='bg-[#2a4eb9] hover:bg-[#0C2879] p-2 rounded-md cursor-pointer flex gap-2'
        onClick={()=>clickHandle()}
    >
        <LoginForm setOpen={setOpen} open={open} setLogin={setLogin}/>
        {mode == "form" ? <FaClipboardList size={20} color="white"/> : <AiOutlineForm size={20} color="white"/>}
        <div className='text-white font-semibold hidden lg:block'>
          {mode == "form" ? "List Permohonan" : "Permohonan"}
        </div>
    </div>
  )
}

export default ListPermohonanButton