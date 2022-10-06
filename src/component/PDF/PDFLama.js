import React from 'react'
import { Document, Page, StyleSheet, Text ,View} from '@react-pdf/renderer';


const PDFLama = ({hasil,user}) =>{


    const styles = StyleSheet.create({
        titleFirst: {
          fontSize: 12,
          textAlign: "center",
          fontWeight:"700",
          fontFamily: "Times-Roman",
        },
        titleSecond: {
            marginTop:10,
            fontSize: 12,
            textAlign: "center",
            fontFamily: "Times-Roman",
        },
        text: {
          margin: 5,
          fontSize: 12,
          textAlign: "justify",
          fontFamily: "Times-Roman",
          lineHeight:"1.6 "
        },
        image: {
          marginVertical: 15,
          marginHorizontal: 100,
        },
        header: {
          fontSize: 12,
          marginBottom: 20,
          textAlign: "center",
          color: "grey",
        },
        pageNumber: {
          position: "absolute",
          fontSize: 12,
          bottom: 30,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "grey",
        },
      });

    return ( <Document>
        <Page size="A4" style={{paddingTop:35,paddingBottom:65,paddingHorizontal:45}} wrap={false}>
            <Text style={styles.titleFirst}>
                <b>INFORMASI KETENTUAN TATA RUANG</b>
            </Text>
            <Text style={styles.text}>
               Dasar Hukum
            </Text>
            <div style={{marginLeft:"20",border:"solid 2px black"}}>
                <Text style={styles.text}>
                    1.Peraturan Daerah Nomor 2 Tahun 2021 tentang Rencana Tata Ruang Wilayah Kota Yogyakarta Tahun 2021-2041
                </Text>
                <Text style={styles.text}>
                    2.Peraturan Walikota Nomor 118 Tahun 2021 tentang Rencana Detail Tata Ruang Kota Yogyakarta Tahun 2021-2041
                </Text>
            </div>
           
            <Text style={styles.text}>
                Berdasarkan permohonan Saudara, bersama ini kami berikan Advice Planning (Surat Keterangan Rencana Kota) kepada:
            </Text>
            <View style={{display:"flex",marginLeft:20}} >
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"50%"}]}>
                        1. Nama
                    </Text>
                    <Text style={styles.text}>
                        : {user.namaLengkap}
                    </Text>
                </View>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"50%"}]}>
                        2. Alamat
                    </Text>
                    <Text style={styles.text}>
                        : {user.alamat}
                    </Text>
                </View>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"50%"}]}>
                        3. Bukti Hak Atas Tanah/No. 
                    </Text>
                    <Text style={styles.text}>
                        : -
                    </Text>
                </View>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"50%"}]}>
                        4. Fungsi Bangunan  
                    </Text>
                    <Text style={styles.text}>
                        : {hasil.simulasi.kegiatan}
                    </Text>
                </View>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"50%"}]}>
                        5. Luas Tanah (Persil)  
                    </Text>
                    <Text style={styles.text}>
                        : {hasil.intensitas.luas} m2
                    </Text>
                </View>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"50%"}]}>
                        6. No. Telepon  
                    </Text>
                    <Text style={styles.text}>
                        : {user.noHp}
                    </Text>
                </View>
            </View>
            <View break style={{display:"flex"}}>
                <Text style={styles.text}>KETENTUAN TATA RUANG</Text>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"50%"}]}>
                        1. Status Kawasan
                    </Text>
                    <Text style={styles.text}>
                        :
                    </Text>
                    <Text style={[styles.text,{width:"50%"}]}>
                        {hasil.dataZonasi.kawasan}
                    </Text>
                </View>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"50%"}]}>
                        2. Pola Pemanfaatan Ruang
                    </Text>
                    <Text style={styles.text}>
                        :
                    </Text>
                    <Text style={[styles.text,{width:"50%"}]}>
                         {hasil.dataZonasi.zona}
                    </Text>
                </View>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"50%"}]}>
                        3. Ketentuan Zonasi
                    </Text>
                    <Text style={styles.text}>
                        :
                    </Text>
                    <Text style={[styles.text,{width:"50%"}]}>
                        {hasil.simulasi.izin}
                    </Text>
                </View>
                <View>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"50%"}]}>
                        4. Intensitas
                    </Text>
                    <Text style={styles.text}>
                        :
                    </Text>
                    <Text style={[styles.text,{width:"50%"}]}>
                        
                    </Text>
                </View>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"50%",paddingLeft:10}]}>
                        a. Koefisien Dasar Bangunan (KDB)
                    </Text>
                    <Text style={styles.text}>
                        :
                    </Text>
                    <Text style={[styles.text,{width:"50%"}]}>
                        Untuk luas tanah sebesar {hasil.intensitas.luas} m2 maka KDB maksimal adalah {hasil.intensitas.kdb}% atau sebesar {(hasil.intensitas.klb.replace(/,/g, '.')*hasil.intensitas.luas).toFixed(2)} m2
                    </Text>
                </View>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"50%",paddingLeft:10}]}>
                        b. Koefisien Lantai Bangunan (KLB)
                    </Text>
                    <Text style={styles.text}>
                        :
                    </Text>
                    <Text style={[styles.text,{width:"50%"}]}>
                        Untuk luas tanah diatas {hasil.intensitas.luas} m2 maka KLB maksimal adalah {hasil.intensitas.klb}% atau sebesar {(hasil.intensitas.kdb*hasil.intensitas.luas*0.01).toFixed(2)} m2
                    </Text>
                </View>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"50%",paddingLeft:10}]}>
                        c. Koefisien Dasar Hijau (KDH)
                    </Text>
                    <Text style={styles.text}>
                        :
                    </Text>
                    <Text style={[styles.text,{width:"50%"}]}>
                        Untuk luas tanah diatas {hasil.intensitas.luas} m2 maka KDH minimal adalah {hasil.intensitas.kdh}% atau sebesar {(hasil.intensitas.kdh*hasil.intensitas.luas*0.01).toFixed(2)} m2
                    </Text>
                </View>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"50%",paddingLeft:10}]}>
                        d. Tinggi Bangunan
                    </Text>
                    <Text style={styles.text}>
                        :
                    </Text>
                    <Text style={[styles.text,{width:"50%"}]}>
                        Untuk luas tanah diatas {hasil.intensitas.luas} m2 maka tinggi maksimal bangunan adalah {hasil.intensitas.tinggi} m
                    </Text>
                </View>
                </View>
                {hasil.simulasi.syarat != "" && <div>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"50%"}]}>
                        5. Ketentuan Zonasi
                    </Text>
                    <Text style={styles.text}>
                        :
                    </Text>
                    <Text style={[styles.text,{width:"50%"}]}>
                      
                    </Text>
                </View>
                <View style={{paddingLeft:10,display:"flex",flexDirection:"column"}}>
                    {hasil.simulasi.syarat.split(";").map((syarat,index)=>{
                        return(
                            <View style={{display:"flex",flexDirection:"row"}}>
                                <Text style={[styles.text]}>
                                    {(String.fromCharCode(65+index)).toLowerCase()} 
                                </Text>
                                <Text style={styles.text}>
                                {syarat}
                                </Text>
                            </View>
                        )
                    })}
                </View>  
                </div>}

                {hasil.dataZonasi.kawasan != "Tidak Ada" && <div>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"50%"}]}>
                        6. Ketentuan Kawasan Khusus
                    </Text>
                    <Text style={styles.text}>
                        :
                    </Text>
                    <Text style={[styles.text,{width:"50%"}]}>
                      
                    </Text>
                </View>
                <View style={{paddingLeft:10,display:"flex",flexDirection:"column"}}>
                    {hasil.ketentuan.gaya.split(";").map((syarat,index)=>{
                        return(
                            <View style={{display:"flex",flexDirection:"row"}}>
                                <Text style={[styles.text]}>
                                    {(String.fromCharCode(65+index)).toLowerCase()} 
                                </Text>
                                <Text style={styles.text}>
                                {syarat}
                                </Text>
                            </View>
                        )
                    })}
                </View>
                </div>
                }
      
                <Text style={styles.text}>KETERANGAN</Text>
                <View style={{display:"flex",flexDirection:"column"}}>
                    <View style={{display:"flex",flexDirection:"row"}}>
                        <Text style={[styles.text]}>
                            1) 
                        </Text>
                        <Text style={styles.text}>
                            Advice Planning BUKANLAH IZIN, namun Surat Keterangan Rencana Kota yang berisi informasi tentang ketentuan tata ruang pada lokasi yang dimaksud sesuai dengan ketentuan peraturan yang berlaku
                        </Text>
                    </View>
                    <View style={{display:"flex",flexDirection:"row"}}>
                        <Text style={[styles.text]}>
                            2) 
                        </Text>
                        <Text style={styles.text}>
                            Advice Planning diberikan hanya satu kali sebagai salah satu persyaratan pengajuan permohonan IMB (Izin Mendirikan Bangunan) dengan nama pemohon yang bersangkutan
                        </Text>
                    </View>
                    <View style={{display:"flex",flexDirection:"row"}}>
                        <Text style={[styles.text]}>
                            3) 
                        </Text>
                        <Text style={styles.text}>
                            Apabila terjadi perubahan peraturan, maka Advice Planning ini dinyatakan tidak berlaku dan wajib disesuaikan dengan peraturan yang baru
                        </Text>
                    </View>
                </View>
            </View>
        </Page>
  </Document>)
   

}

export default PDFLama