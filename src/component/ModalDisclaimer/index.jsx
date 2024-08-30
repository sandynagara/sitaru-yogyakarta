import { Modal } from '@mui/material'
import React,{useState} from 'react'
import { useEffect } from 'react'

function ModalDisclaimer() {

    const [isAgree, setIsAgree] = useState(false)
    const [open, setOpen] = useState(true)

    const syaratKetentuan = [
        "Sistem Informasi Gatra Matra menyediakan data-data Rencana Tata Ruang di wilayah Kota Yogyakarta sebagai bagian dari keterbukaan informasi tata ruang",
        "Data yang disajikan pada Sistem Informasi Gatra Matra merupakan data terbaru sesuai dengan ketentuan yang berlaku saat ini (Peraturan Walikota Yogyakarta Nomor 118 Tahun 2021 Tentang Rencana Detail Tata Ruang Kota Yogyakarta Tahun 2021 – 2041). Meskipun demikian, informasi pada sistem informasi Gatra Matra bukan merupakan rujukan utama untuk kegiatan penataan ruang tanpa keputusan tertulis dari Dinas Pertanahan dan Tata Ruang (Kundha Niti Mandala Sarta Tata Sasana) Kota Yogyakarta",
        "Kelengkapan data yang disajikan sesuai dengan produk hukum yang berlaku",
        "Dinas Pertanahan dan Tata Ruang (Kundha Niti Mandala Sarta Tata Sasana) Kota Yogyakarta tidak bertanggungjawab atas segala kesalahan atau kerugian yang timbul karena tindakan terkait dengan penggunaan data dan informasi yang disajikan pada situs ini",
        "Apabila terdapat perbedaan antara data pada infromasi di Sistem Informasi Gatra Matra ini dengan informasi resmi, maka dikembalikan kepada hukum yang berlaku."
    ]

    useEffect(() => {
        const jwt = sessionStorage.getItem('agreement');
        jwt && setOpen(false)
    }, [])
    

    const nextOpen = () => {
        if(isAgree){
            sessionStorage.setItem('agreement', true);
            setOpen(false)
        }
    }

  return (
    <Modal
        open={open}
        className='flex justify-center items-center'
    >
        <div className='w-4/5 max-h-[80%] p-2 flex flex-col rounded-md gap-2 bg-white'>
            <div className=' text-sky-700 p-2 font-bold border-b-2 border-black'>
                Ketentuan Penggunaan
            </div>
            <div className='p-2 max-h-[80%] text-xs lg:text-sm scroll overflow-y-scroll font-medium flex flex-col gap-2'>
                Dengan menggunakan situs ini, pengguna setuju dengan Syarat dan Ketentuan yang berlaku :
                {syaratKetentuan.map((syarat,index)=>{
                    return  <div key={index} className='flex gap-2'>
                        <div className=' w-[10px] flex items-center'>
                            <div className='h-[7px] w-[7px] bg-sky-700 rounded-full'></div>
                        </div>
                       
                        <div className=' text-xs lg:text-sm text-justify font-normal'>
                            {syarat}
                        </div>
                    </div>
                })}
            </div>
            <div className={`flex items-center text-xs lg:text-sm gap-2 font-medium  ${isAgree ? "text-sky-500" : "text-gray-500"}`}>
                <div className={`w-12 h-6 relative flex items-center px-1 cursor-pointer rounded-full transition duration-500 ${isAgree ? "bg-sky-500" : "bg-gray-500"}`} onClick={()=>setIsAgree(!isAgree)}>
                    <div className={` h-4 w-4 bg-white rounded-full top-0 bottom-0 my-auto transform transition-all duration-500 ${isAgree && "translate-x-6"}`}/>
                </div>
                <div>Saya setuju dengan ketentuan diatas</div>
            </div>
            <div className='lg:flex lg:justify-end text-sm'>
                <div className={`px-4 py-2 rounded-md  text-white font-medium flex items-center justify-center ${isAgree ? "bg-sky-500 hover:bg-sky-700 cursor-pointer" : "bg-gray-500"} `} onClick={nextOpen}>
                    LANJUTKAN
                </div>
            </div>
        </div>
    </Modal>
  )
}

export default ModalDisclaimer