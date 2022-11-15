import React from 'react'
import login from "../../images/Panduan/Login/login.png"
import register from "../../images/Panduan/Login/register.png"

function PanduanLogin() {
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
            Menu login & register digunakan sebagai tempat untuk pengguna melakukan login dan membuat akun. dan mempunyai tampilan sebagai berikut:
            <img src={login}  alt='gambar basemap'/>
            Pada tampilan di atas, pengguna perlu masukkan username dan password. Jika pengguna belum memilki akun maka pengguna dapat membuat akun dengan menklik tulisan register dan akan muncul tampilan berikut:
            <img src={register}  alt='gambar basemap' />
            Pada tampilan tersebut pengguna perlu memasukkan informasi berupa: nama lengkap, username, alamat, nomor Handphone (opsional), dan password setelah itu pengguna mengetikkan password yang sama pada kolom confirm password untuk memastikan pengguna tidak salah memasukkan password. Setelah klik register dan akun pun telah berhasil dibuat.
        </div>
      )
}

export default PanduanLogin