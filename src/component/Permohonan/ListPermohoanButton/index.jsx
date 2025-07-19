import  { useState } from 'react'
import { FaClipboardList } from "react-icons/fa"
import { AiOutlineForm } from "react-icons/ai"
import { AuthService } from '../../../service/login'

function ListPermohonanButton({ setMode, mode }) {

  const [open, setOpen] = useState(false)

  const clickHandle = async () => {
    if (mode == "listform") {
      setMode("form")
    } else if (!open) {
      try {
        const token = localStorage.getItem("authToken")
        if (token) {
          setMode("listform")
        } else {
          AuthService.ssoLogin()
        }
      } catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <div className='bg-[#2a4eb9] hover:bg-[#0C2879] p-2 rounded-md cursor-pointer flex gap-2'
      onClick={() => clickHandle()}
    >
      {mode == "form" ? <FaClipboardList size={20} color="white" /> : <AiOutlineForm size={20} color="white" />}
      <div className='text-white font-semibold hidden lg:block'>
        {mode == "form" ? "List Permohonan" : "Permohonan"}
      </div>
    </div>
  )
}

export default ListPermohonanButton