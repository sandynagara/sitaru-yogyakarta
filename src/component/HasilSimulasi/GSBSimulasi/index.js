import React,{useState} from 'react'
import gsbLogo from "../../../images/gsb.png"

function GSBSimulasi({gsb,remark}) {

    const [listGsb, setListGsb] = useState(gsb.split(","))
    const [listRemark, setListRemark] = useState(remark.split(","))

    const gsbJalanLingkungan  = [
        "a. Untuk lebar jalan eksisting kurang dari sama dengan 2 m = 1-k-1",
        "b. Untuk lebar jalan lebih dari 2 m hingga sama dengan 4 m = 1,5-k-1,5",
        "c. Untuk lebar jalan eksisting lebih dari 4 m = 2-k-2"
    ]

    const listKeteranganGsb  = [
        "(a) merupakanangka GSB paling rendah pada area sisi 1",
        "(b) merupakan angka GSB paling rendah pada area sisi 2",
        "k merupakan kondisi lebar ruang milik jalan"
    ]

    return <div className='m-[10px] flex flex-col gap-3'>
      <div className='w-full'>Peraturan Garis Sempadan Bangunan pada persil ini adalah:</div>
      <div className='flex flex-col gap-2 w-full'>
        {listGsb.map((gsb,index)=>{
            gsb = gsb.trimStart()
            var namaGsb = gsb == "GSB Jalan Lingkungan" ? "GSB Jalan Lingkungan" : listRemark[index].trimStart()
            return <div key={index} >
                <div style={{display:"grid",gridTemplateColumns:"48% 2% 50%"}}>
                    <div>{index+1}. {namaGsb}</div>
                    <div>:</div>
                    <div>
                        {namaGsb ==  "GSB Jalan Lingkungan" ?
                            gsbJalanLingkungan.map((gsb)=>{
                                return <div>{gsb}</div>
                            }) : gsb
                        }
                    </div>
                </div>
            </div>
        })}
        <div className='flex flex-col gap-2 items-center'>
            <div className='w-full font-bold'>Keterangan : </div>
            <img className='h-[6rem] md:h-[8rem] bg-contain' src={gsbLogo}/>
            <div className='w-full'>{listKeteranganGsb.map((keterangan,index)=>{
                return <div key={index}>
                    {index+1}. {keterangan}
                </div>
            })}</div>
        </div>
      </div>
  </div>
}

export default GSBSimulasi