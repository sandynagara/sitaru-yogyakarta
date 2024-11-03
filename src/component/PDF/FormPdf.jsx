import React,{useContext,useEffect} from 'react'
import logoDispetaru from "../../images/Logo_dispetaru.png"
import logoYogya from "../../images/Logo_Kota_Yogyakarta.png"
import ScreenshootContext from '../Context/ScreenshootContext';
import {HiDownload} from "react-icons/hi"
import {AiOutlineArrowLeft} from "react-icons/ai"
import { useNavigate } from 'react-router';
import PdfKop from './PdfKop';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';

function FormPdf() {

    const {screenshoot,result,setResult} = useContext(ScreenshootContext);
    const navigate = useNavigate()
    const listDasarHukum = [
        "Undang-undang Nomor 26 Tahun 2007 tentang Penataan Ruang sebagaimana telah diubah dengan undang-undang Nomor 11 Tahun 2020 tentang Cipta Kerja.",
        "Peraturan Pemerintah Nomor 21 Tahun 2021 tentang Penyelenggaraan Penataan Ruang.",
        "Peraturan Daerah Nomor 2 Tahun 2012 tentang Bangunan Gedung.",
        "Peraturan Daerah Nomor 2 Tahun 2021 tentang Rencana Tata Ruang Wilayah Kota Yogyakarta Tahun 2021-2041.",
        "Peraturan Walikota Nomor 118 Tahun 2021 tentang Rencana Detail Tata Ruang Kota Yogyakarta Tahun 2021-2041."
    ]

    const listDataPemohon = [
        {label:"Nama",value:""},
        {label:"Alamat",value:""},
        {label:"No Telepon",value:""},
        {label:"NIB",value:""}
    ]

    const listKeteranganLokasi = [
        {label:"Letak Tanah",value:<input onChange={(e) => changeInputResult("Letak Tanah",e.target.value)} className=' border-solid border-b-2 border-gray-200 w-full focus:outline-0 focus:border-gray-400' style={{fontFamily:"Times-Roman"}}/>},
        {label:"Bukit Hak Atas Tanah/No",value:<input onChange={(e) => changeInputResult("Bukti Tanah",e.target.value)} className=' border-solid border-b-2 border-gray-200 w-full focus:outline-0 focus:border-gray-400' style={{fontFamily:"Times-Roman"}}/>},
        {label:"Luas Tanah (Persil)",value:`${result.intensitas.luas} m2`},
        {label:"Fungsi Bangunan",value:result.simulasi.kegiatan},
        {label:"Denah Lokasi",value:""},
    ]

    const listIntensitas = [
        {label:"a. Koefisien Dasar Bangunan (KDB)",value:`KDB maksimal adalah ${result.intensitas.kdb}% atau sebesar ${(result.intensitas.kdb*result.intensitas.luas*0.01).toFixed(2)} m2`},
        {label:"b. Koefisien Lantai Bangunan (KLB)",value:`KLB maksimal adalah ${result.intensitas.klb} atau sebesar ${(result.intensitas.klb.replace(/,/g, '.')*result.intensitas.luas).toFixed(2)} m2`},
        {label:"c. Koefisien Daerah Hijau (KDH)",value:`KDH minimal adalah ${result.intensitas.kdh}% atau sebesar ${(result.intensitas.kdh*result.intensitas.luas*0.01).toFixed(2)} m2`},
        {label:"d. Tinggi Bangunan",value:`Tinggi maksimal bangunan adalah ${result.intensitas.tinggi} m`},
    ]

    const changeInputResult = (label,value) => {
        const dataPemohon = result?.dataPemohon ? result.dataPemohon : {}
        dataPemohon[label] = value
        setResult({...result,dataPemohon})
    }

    const listMonth = ["January","February","Maret","April","Mei","Juni","July","Agustus","September","October","November","Desember"]

    const getDateNow = () => {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        const dateNow = `${day} ${listMonth[month]} ${year}`
        return dateNow
    }  

    useEffect(() => {
        changeInputResult("date",getDateNow())
    }, [])
    
    
    const generatePdfDocument = async (fileName) => {
        const blob = await pdf((
            <PdfKop hasil={result} screenshoot={screenshoot}/>
        )).toBlob();
        saveAs(blob, fileName);
    };

  return (
    <div className='w-screen p-2 lg:p-4 flex flex-col justify-center items-center gap-2 bg-[#525659]'>
        <div className='w-[95%] text-[9px] md:text-[16px] md:w-[850px] bg-white px-5 py-5 md:px-20 md:py-11 flex flex-col gap-5' style={{fontFamily:"Times-Roman"}}>
            <div className='flex leading-tight flex-col items-center text-center relative ' >
                <div className='flex leading-tight flex-col items-center text-center font-bold'>
                    PEMERINTAH KOTA YOGYAKARTA<br/>DINAS PERTANAHAN DAN TATA RUANG<br/>(KUNDHA NITI MANDALA SARTA TATA SASANA)
                </div>
                <img src={logoDispetaru} width={"65%"}/>
                <div className='text-center font-medium'>
                    Jl. Kenari No. 56 Yogyakarta Kode Pos: 55165 Telp. (0274) 515865, 562682<br/>
                    EMAIL : dinpetaru@jogjakota.go.id<br/>
                    HOTLINE SMS: 08122780001 HOTLINE EMAIL: upik@jogjakota.go.id<br/>
                    WEBSITE: www.jogjakota.go.id
                </div>
                <img src={logoYogya} className='absolute top-0 w-8 md:w-14 left-0'/>
                <div className=' border-b-2 border-black w-[100%] mt-3'/>
            </div>

            <div className='flex leading-tight flex-col items-center text-center font-bold'>
                <div className='underline'>TELAAH KESESUAIAN KEGIATAN PEMANFAATAN RUANG (KKPR)</div>
                <div>Nomor : 0004 / TKKPR / DPTR / I / 2022</div>
            </div>

            <div className='flex flex-col gap-2'>
                Dasar Hukum
                {listDasarHukum.map((dasarHukum,index)=>{
                    return <div key={index} className='flex gap-2'>
                            <div>{index+1}.</div>
                            {dasarHukum}
                    </div>
                })}
            </div>

            <div className='flex flex-col gap-2'>
                <div className='w-full p-1 bg-gray-200 font-bold flex'>A. Data Pemohon</div>
                {listDataPemohon.map((pemohon,index)=>{
                    return <div className='flex' key={index}>
                        <div className='w-[48%] flex gap-2 lg:gap-7'>
                            <div>{index+1}. </div>
                            <div>{pemohon["label"]}</div>
                        </div>
                        <div className='w-[2%]'>:</div>
                        <input onChange={(e)=>changeInputResult(pemohon["label"],e.target.value)} className=' border-solid border-b-2 border-gray-200 w-1/2 focus:outline-0 focus:border-gray-400' style={{fontFamily:"Times-Roman"}}/>
                    </div>
                })}
            </div>

            <div className='flex flex-col gap-2 items-center'>
                <div className='w-full p-1 bg-gray-200 font-bold flex'>B. Data Pemohon</div>
                {listKeteranganLokasi.map((pemohon,index)=>{
                    return <div className='flex w-full' key={index}>
                        <div className='w-[48%] flex gap-2 lg:gap-7'>
                            <div>{index+1}. </div>
                            <div>{pemohon["label"]}</div>
                        </div>
                        <div className='w-[2%]'>:</div>
                        <div className='w-1/2'>{pemohon["value"]}</div>
                    </div>
                })}
                {screenshoot && <img src={screenshoot["basemap"]} className=' w-56 md:w-96'/>}
            </div>

            <div className='flex flex-col gap-2 items-center'>
                <div className='w-full p-1 bg-gray-200 font-bold flex'>C. Informasi Tata Ruang</div>
                <div className='flex w-full'>
                    <div className='w-[48%] flex gap-2 lg:gap-7'>
                        <div>1. </div>
                        <div>Pola Pemanfaatan Ruang</div>
                    </div>
                    <div className='w-[2%]'>:</div>
                    <div>{result.dataZonasi.zona} ({result.simulasi.subzona})</div>
                </div>
               
                {screenshoot && <img src={screenshoot["rdtr"]} className=' w-56 md:w-96'/>}

                <div className='flex w-full'>
                    <div className='w-[48%] flex gap-2 lg:gap-7'>
                        <div>2. </div>
                        <div>Ketentuan Zonasi</div>
                    </div>
                    <div className='w-[2%]'>:</div>
                    <div>
                        {result.simulasi?.izin}
                    </div>
                </div>
                
                <div className='flex w-full flex-col'>
                    <div className='flex w-full'>
                        <div className='w-[48%] flex gap-2 lg:gap-7'>
                            <div>3. </div>
                            <div>Intensitas</div>
                        </div>
                        <div className='w-[2%]'>:</div>
                    </div>
                    <div className='flex flex-col gap-2 ml-4 lg:ml-10'>
                        {listIntensitas.map((intensitas,index)=>{
                            return <div className='flex w-full' key={index}>
                                <div className='w-[45%] flex gap-2 lg:gap-7'>
                                    <div>{intensitas["label"]}</div>
                                </div>
                                <div className='w-[2%]'>:</div>
                                <div>
                                    {intensitas["value"]}
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                
                
            </div>

            <div className='flex flex-col gap-2 items-center'>
                <div className='w-full p-1 bg-gray-200 font-bold flex'>D. Keterangan Lain (Ketentuan Khusus & Informasi Lainnya) :</div>
                <div className='ml-4 lg:ml-10'>
                    {result.ketentuan.gaya.split(";").map((syarat,index)=>{
                        if(syarat == "") return 
                        return(
                            <div className='flex gap-2' key={index}>
                                <div>
                                    {(String.fromCharCode(65+index)).toLowerCase()}.
                                </div>
                                <div className=' text-justify'>
                                    {syarat}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='flex justify-end '>
                <div className='w-1/2 justify-center text-center text-[6px] lg:text-sm flex flex-col gap-1'>
                    <div>Yogyakarta ,  {getDateNow()}</div>
                    <div>An. Kepala Dinas</div>
                    <div>KEPALA BIDANG TATA RUANG DINAS PERTANAHAN DAN TATA RUANG (KUNDHA NITI MANDALA SARTA TATA SASANA)</div>
                    <div className=' font-bold underline mt-8 lg:mt-16'>PAMUNGKAS, S.T., M.T</div>
                    <div>NIP. 197512032005011005</div>
                </div>
            </div>
        </div>
        <div className='fixed flex justify-between w-screen px-2 lg:px-8 py-2 text-white top-0 bg-black bg-opacity-80'>
            <div onClick={()=>navigate("/dashboard")} className='flex gap-2 items-center cursor-pointer px-2 py-2 hover:bg-white hover:bg-opacity-10'>
                <AiOutlineArrowLeft/>
                Kembali
            </div>
            <div onClick={()=>generatePdfDocument("INFORMASI KETENTUAN TATA RUANG")} className='flex gap-2 items-center cursor-pointer px-2 py-2 hover:bg-white hover:bg-opacity-10'>
                    <HiDownload/>
                    Download
            </div>
            {/* {result?.dataPemohon && <PDFDownloadLink document={<PdfKop hasil={result} screenshoot={screenshoot}/>} fileName="INFORMASI KETENTUAN TATA RUANG">
                <div className='flex gap-2 items-center cursor-pointer px-2 py-2 hover:bg-white hover:bg-opacity-10'>
                    <HiDownload/>
                    Download
                </div>
            </PDFDownloadLink>
            } */}
           
           
        </div>
    </div>
  )
}

export default FormPdf