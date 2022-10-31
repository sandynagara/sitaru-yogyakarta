import React,{useState} from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import {AiOutlineArrowLeft,AiOutlineDownload} from "react-icons/ai"
import {AiOutlineZoomIn,AiOutlineZoomOut} from "react-icons/ai"

function OpenPdf({pdf,setPdf}) {

  const [numPages, setNumPages] = useState(null);
  const [zoom, setZoom] = useState(0.6);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const downloadFile = (url,nama="No name") => {
    fetch(url).then(res=>res.blob()).then((res)=>{
      var data = new Blob([res], {type: 'application/pdf'});
      var csvURL = window.URL.createObjectURL(data);
      var tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute('download', `${nama}.pdf`);
      tempLink.click();
    })
  }

  return (
    <div className='fixed left-0 w-screen h-screen top-0 bg-black bg-opacity-80 z-50'>
        <div className='p-4 flex text-white text-sm justify-between bg-black'>
            <AiOutlineArrowLeft color='white' className='cursor-pointer' size={20} onClick={()=>setPdf(false)}/>
            <div className='ml-2 flex items-center'>
              {pdf["nama"]}
            </div>
            <AiOutlineDownload color='white' className='cursor-pointer' size={20} onClick={()=>{downloadFile(pdf["url"],pdf["nama"])}}/>
        </div>
        <div>
          <div className='flex h-[calc(100vh-100px)] w-full  overflow-y-scroll flex-col items-center '>
            <Document file={{url:pdf["url"]}} onLoadSuccess={onDocumentLoadSuccess} >
              {Array(numPages).fill(1).map((x,y) => {
                return <Page scale={zoom} pageNumber={y+1} />
              }
              )}
            </Document>
          </div>
          <div className='text-white text-center py-2 flex justify-center items-center'>
              Page {pageNumber} of {numPages}
              <div className='ml-2 flex'>
                {zoom == 0 ? 
                  <AiOutlineZoomOut size={23} color="gray" className="ml-2"/> :
                  <AiOutlineZoomOut size={23} className="ml-2 cursor-pointer"  onClick={()=>setZoom(zoom-0.2)}/>
                }
                <AiOutlineZoomIn size={23} className="ml-2 cursor-pointer" onClick={()=>setZoom(zoom+0.2)}/>
              </div>
          </div>
        </div>
       
    </div>
  )
}

export default OpenPdf