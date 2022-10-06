import React from 'react'
import pilihan from "../../images/Panduan/Simulasi/pilihan.png"
import hasil from "../../images/Panduan/Simulasi/hasil.png"
import surat from "../../images/Panduan/Simulasi/surat.png"
import intensitas from "../../images/Panduan/Simulasi/intensitas.png"

function PanduanSimulasi() {
  return (
    <div style={{
        padding:"20px 20px",
        lineHeight:"26px",
        textAlign:"justify",
        maxHeight:"500px",
        overflowY:"scroll",
        display:"flex",
        flexDirection:"column",
        alignItems:'center'
        }}
    >   

        Menu Simulasi digunakan untuk melakukan simulasi terhadap persil bidang tanah dimana menu ini pengguna perlu memilih persil tertentu kemudian membuka menu simulasi dan akan muncul tampilan seperti berikut:
        <img src={pilihan} />
        Disana pengguna dapat memilih kegiatan yang ada beserta keterangan terkait kegiatan tersebut, jika sudah maka pengguna perlu memasukkan luas persil yang dipilih sebelumnya
        <img src={intensitas}/>
        Pada tampilan tersebut ketika pengguna memasukkan luas bidang maka akan muncul informasi terkait intensitas sesuai dengan luas yang dimasukkan, lalu ketika pengguna menklik tombol “Cek Perizinan” maka akan muncul hasil simulasi terkait izin diperbolehkan atau tidak kegiatan tersebut dilakukan dan syarat-syarat yang menyertai kegiatan tersebut.
        <img src={hasil}/>
        Setelah itu pengguna dapat mencetak surat informasi ketentuan tata ruang berdasarkan hasil simulasi yang telah dilakukan dengan menekan tombol “Cetak”.
        <img src={surat}/>
    </div>
  )
}

export default PanduanSimulasi