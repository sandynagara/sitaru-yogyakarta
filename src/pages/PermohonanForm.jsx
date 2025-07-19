import FormPermohonan from '../component/Permohonan/FormPermohonan'
import BackHome from '../component/Permohonan/BackHome'
import { Link } from 'react-router-dom'
import { FaClipboardList } from 'react-icons/fa'

export default function PermohonanForm() {

  return (
    <div className=' h-screen p-2 flex flex-col gap-4 bg-[#F9FAFE] overflow-scroll'>
      <div className='mx-4 lg:mx-20 flex items-center justify-between'>
        <BackHome/>
        <Link to={"/permohonan/list"}>
          <div className='bg-[#2a4eb9] hover:bg-[#0C2879] p-2 rounded-md cursor-pointer flex gap-2'>
          <FaClipboardList size={20} color="white" />
          <div className='text-white font-semibold hidden lg:block'>
            Permohonan
          </div>
          </div>
        </Link>    
      </div>
      <FormPermohonan/>
    </div>
  )
}
