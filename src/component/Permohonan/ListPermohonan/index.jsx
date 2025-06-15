import { useEffect } from 'react'
import { useState } from 'react'
import { AiFillInfoCircle, AiFillEye, AiFillFilePdf } from "react-icons/ai"
import ModalPermohonan from '../ModalPermohonan'
import ModalShowImage from '../ModalShowImage'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { PermohonanService } from '../../../service/permohonan'

function ListPermohonan() {

    const [listData, setListData] = useState(false)
    const [openDetail, setOpenDetail] = useState(false)
    const [openImage, setOpenImage] = useState(false)
    const [imageData, setImageData] = useState(false)
    const [selectData, setSelectData] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(5)

    const fetchPermohonan = async () => {
        const data = await PermohonanService.getMany(page)
        setListData(data["data"])
        setTotalPage(data["totalPages"])
    }

    useEffect(() => {
        fetchPermohonan()
    }, [page])

    const convertISOtoLocal = (data) => {
        const date = new Date(data);
        let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('UTC', options);
    }

    const clickHandler = (data) => {
        setSelectData(data)
        setOpenDetail(true)
    }

    const openFile = (path, name, type) => {
        const token = localStorage.getItem("authToken");
        let url = `${process.env.REACT_APP_BASE_URL}/permohonan/${path}?token=${token}`
        if (type === "image") {
            setOpenImage(true)
            setImageData({ url: url, name: name })
            return
        }

        let w = window.open("", '_blank');
        if (w.document) {
            w.document.write('<html><head><title>' + name + '</title></head><body style="margin:0px;overflow:"hidden"><iframe src="' + url + '" height="100%" width="100%"></iframe></body></html>');
        }
    }

    const Pagination = ({ count }) => {
        const renderItems = [];

        for (let i = page - 2; i <= page + 2; i++) {
            if (i <= 0 || i > totalPage) {
                continue
            }
            renderItems.push(<div key={i} onClick={() => setPage(i)} className={`${page == i ? "text-[#0C2879] border-b-2 border-[#0C2879] text-bs" : "text-[#808fbb] text-sm"} font-bold cursor-pointer`}>{i}</div>);
        }

        return <div className='flex gap-2 items-center justify-center'>{renderItems}</div>;
    };

    const listField = [
        { field: "No", space: 1 },
        { field: "Tanggal", space: 2 },
        { field: "Pemohon", space: 2 },
        { field: "Detail", space: 1 },
        { field: "Formulir", space: 1 },
        { field: "KTP", space: 1 },
        { field: "Sertifikat", space: 1 },
        { field: "Denah", space: 1 }
    ]

    const listFieldFile = [
        { "title": "Formulir", "type": "file", "field": "formulir" },
        { "title": "KTP", "type": "image", "field": "ktp" },
        { "title": "Sertifikat", "type": "image", "field": "sertifikat" },
        { "title": "Denah", "type": "image", "field": "denah" },
    ]

    return (
        <div className='lg:px-12'>
            <div className='border-2 px-4 lg:px-8 py-2 lg:py-8 flex flex-col gap-3 rounded-md bg-white lg:w-full'>
                <div className='text-[#0C2879] text-lg font-bold'>
                    List Permohonan
                </div>

                <div className='lg:hidden flex gap-2 flex-col'>
                    {listData && listData.map((data, index) => {
                        return <div className='text-gray-500 bg-gray-50 p-2 rounded-md flex justify-between' key={index} onClick={() => clickHandler(data)}>
                            <div className='font-semibold'>
                                {(index + 1) + (page - 1) * 10}. {convertISOtoLocal(data["tanggal"])}_{data["pemohon"]}
                            </div>
                            <div>
                                <AiFillInfoCircle size={25} color="gray" className='cursor-pointer' />
                            </div>
                        </div>
                    })}
                </div>

                <div className='hidden lg:block '>
                    <div className='py-2 lg:grid lg:grid-cols-10 font-bold border-b-2 border-solid border-black'>
                        {listField.map((field, index) => {
                            return <div key={index} className={`col-span-${field["space"]}`} >
                                {field["field"]}
                            </div>
                        })}
                    </div>
                    <div>
                        {listData && listData.map((data, index) => {
                            return <div className='grid grid-cols-10 py-2' key={index}>
                                <div className='font-semibold'>
                                    {(index + 1) + (page - 1) * 10}
                                </div>
                                <div className={`col-span-2 font-semibold`}>
                                    {convertISOtoLocal(data["tanggal"])}
                                </div>
                                <div className={`col-span-2 font-semibold`}>
                                    {data["pemohon"]}
                                </div>
                                <div className={`col-span-1 flex`}>
                                    <div onClick={() => clickHandler(data)} className='flex items-center px-2 py-1 gap-2 text-sm font-semibold bg-[#2a4eb9] hover:bg-[#0C2879] text-white rounded-md cursor-pointer'>
                                        <AiFillEye color='white' />
                                        Detail
                                    </div>
                                </div>

                                {listFieldFile.map((field, index) => {
                                    return <div className={`col-span-1 flex`} key={index}>
                                        <div onClick={() => openFile(data[field["field"]], `${field["title"]}_${data["pemohon"]}`, field["type"])} className='flex items-center px-2 py-1 gap-2 text-sm font-semibold bg-[#2a4eb9] hover:bg-[#0C2879] text-white rounded-md cursor-pointer'>
                                            <AiFillFilePdf color='white' />
                                            {field["field"]}
                                        </div>
                                    </div>
                                })}
                            </div>
                        })}
                    </div>
                </div>

                <div className='flex justify-center items-center font-semibold gap-2'>
                    <div onClick={() => setPage(1)} className={`${page < 3 ? "hidden" : "flex"} cursor-pointer text-[#0C2879]`}>
                        <MdKeyboardArrowLeft size={20} />
                        <MdKeyboardArrowLeft size={20} className='absolute m-[0px] p-0 ml-2 ' />
                    </div>
                    <MdKeyboardArrowLeft size={20} onClick={() => setPage(page - 1)} className={`${page - 1 === 0 ? "hidden" : "block"} cursor-pointer text-[#0C2879]`} />
                    <Pagination count={totalPage} />
                    <MdKeyboardArrowRight size={20} onClick={() => setPage(page + 1)} className={`${page === totalPage ? "hidden" : "block"} cursor-pointer text-[#0C2879]`} />
                    <div onClick={() => setPage(totalPage)} className={`${page > totalPage - 2 ? "hidden" : "flex"} cursor-pointer text-[#0C2879]`}>
                        <MdKeyboardArrowRight size={20} className='absolute m-[0px] p-0 ml-[-0.5rem] ' />
                        <MdKeyboardArrowRight size={20} />
                    </div>
                </div>

                <ModalPermohonan open={openDetail} setOpen={setOpenDetail} data={selectData} />
                <ModalShowImage open={openImage} setOpen={setOpenImage} imageData={imageData} />
            </div>
        </div>
    )
}

export default ListPermohonan