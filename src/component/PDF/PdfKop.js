import React from 'react'
import { Document, Page, StyleSheet, Text ,View,Image} from '@react-pdf/renderer';
import logoDispetaru from "../../images/Logo_dispetaru.png"
import logoKota from "../../images/Logo_Kota_Yogyakarta.png"

function PdfKop({hasil,screenshoot}) {
    
    // const {screenshoot } = useContext(ScreenshootContext);
    
    const styles = StyleSheet.create({
        headTitle:{
            margin: 0,
          fontSize: 12,
          textAlign: "justify",
          fontFamily: "Times-Roman",
        },
        titleFirst: {
          fontSize: 12,
          textAlign: "center",
          fontWeight:"700",
          fontFamily: "Times-Bold",
        },
        titleSecond: {
            marginTop:10,
            fontSize: 12,
            textAlign: "center",
            fontFamily: "Times-Roman",
        },
        text: {
          margin: 3,
          fontSize: 11,
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

    const listDataPemohon = [
        {label:"Nama",value:hasil.dataPemohon?.Nama },
        {label:"Alamat",value:hasil.dataPemohon?.Alamat},
        {label:"No Telepon",value:hasil.dataPemohon?.["No Telepon"]},
        {label:"NIB",value:hasil.dataPemohon?.NIB}
    ]

    const listKeteranganLokasi = [
        {label:"Letak Tanah",value:hasil.dataPemohon?.["Letak Tanah"]},
        {label:"Bukit Hak Atas Tanah/No",value:hasil.dataPemohon?.["Bukti Tanah"]},
        {label:"Luas Tanah (Persil)",value:`${hasil.intensitas.luas} m2`},
        {label:"Fungsi Bangunan",value:hasil.simulasi.kegiatan},
        {label:"Denah Lokasi",value:""},
    ]

    const listIntensitas = [
        {label:"a. Koefisien Dasar Bangunan (KDB)",value:`KDB maksimal adalah ${hasil.intensitas.kdb}% atau sebesar ${(hasil.intensitas.kdb*hasil.intensitas.luas*0.01).toFixed(2)} m2`},
        {label:"b. Koefisien Lantai Bangunan (KLB)",value:`KLB maksimal adalah ${hasil.intensitas.klb} atau sebesar ${(hasil.intensitas.klb.replace(/,/g, '.')*hasil.intensitas.luas).toFixed(2)} m2`},
        {label:"c. Koefisien Daerah Hijau (KDH)",value:`KDH minimal adalah ${hasil.intensitas.kdh}% atau sebesar ${(hasil.intensitas.kdh*hasil.intensitas.luas*0.01).toFixed(2)} m2`},
        {label:"d. Tinggi Bangunan",value:`Tinggi maksimal bangunan adalah ${hasil.intensitas.tinggi} m`},
    ]

    const listDasarHukum = [
        "Undang-undang Nomor 26 Tahun 2007 tentang Penataan Ruang sebagaimana telah diubah dengan undang-undang Nomor 11 Tahun 2020 tentang Cipta Kerja.",
        "Peraturan Pemerintah Nomor 21 Tahun 2021 tentang Penyelenggaraan Penataan Ruang.",
        "Peraturan Daerah Nomor 2 Tahun 2012 tentang Bangunan Gedung.",
        "Peraturan Daerah Nomor 2 Tahun 2021 tentang Rencana Tata Ruang Wilayah Kota Yogyakarta Tahun 2021-2041.",
        "Peraturan Walikota Nomor 118 Tahun 2021 tentang Rencana Detail Tata Ruang Kota Yogyakarta Tahun 2021-2041."
    ]

    const gsbJalanLingkungan  = [
        "a. Untuk lebar jalan eksisting kurang dari sama dengan 2 m = 1-k-1",
        "b. Untuk lebar jalan lebih dari 2 m hingga sama dengan 4 m = 1,5-k-1,5",
        "c. Untuk lebar jalan eksisting lebih dari 4 m = 2-k-2"
    ]

    return ( <Document>
        <Page size="A4" style={{paddingTop:35,paddingBottom:65,paddingHorizontal:60}} wrap={false}>
            <View style={{display:"flex",alignItems:"center",position:"relative"}}>
                <Text style={[styles.headTitle,{fontFamily:"Times-Bold"}]}>
                    PEMERINTAH KOTA YOGYAKARTA
                </Text>
                <Text style={[styles.headTitle,{fontFamily:"Times-Bold"}]}>
                    DINAS PERTANAHAN DAN TATA RUANG
                </Text>
                <Text style={[styles.headTitle,{fontFamily:"Times-Bold"}]}>
                   (KUNDHA NITI MANDALA SARTA TATA SASANA)
                </Text>
                <View style={{position:"absolute",left:0, display:"flex",flexDirection:"row"}}>
                    <Image src={logoKota} style={{width:40,height:60}}/>
                </View>
                <View style={{display:"flex",justifyContent:"center"}}>
                    <Image src={logoDispetaru} style={{width:"80%",height:60}}/>
                </View>
                <Text style={[styles.headTitle]}>
                    Jl. Kenari No. 56 Yogyakarta Kode Pos: 55165  Telp.  (0274) 515865, 562682
                </Text>
                <Text style={[styles.headTitle]}>
                    EMAIL : dinpetaru@jogjakota.go.id
                </Text>
                <Text style={[styles.headTitle]}>
                    HOTLINE SMS: 08122780001 HOTLINE EMAIL: upik@jogjakota.go.id
                </Text>
                <Text style={[styles.headTitle]}>
                    WEBSITE: www.jogjakota.go.id
                </Text>
                <Text style={{padding:5,width:"100%",borderBottom: '1px solid black'}}></Text>
            </View>

            <View style={{marginTop:"20px",alignItems:"center"}}>
                <Text style={[styles.headTitle,{textAlign:"center",margin:0,borderBottom: '1px solid black',fontFamily:"Times-Bold"}] }>
                    TELAAH KESESUAIAN KEGIATAN PEMANFAATAN RUANG (KKPR)
                </Text>
                <Text style={[styles.text,{margin:0,fontFamily:"Times-Bold"}]}>
                    Nomor : 0004 / TKKPR / DPTR / I / 2022
                </Text>
            </View>

            <View>
                <Text style={[styles.text,{marginTop:"20px"}]}>
                    Dasar Hukum
                </Text>
                {listDasarHukum.map((dasarHukum,index)=>{
                    return <View style={{display:"flex",flexDirection:"row"}}>
                        <Text style={[styles.text]}>
                            {index+1}.
                        </Text>
                        <Text style={[styles.text]}>
                            {dasarHukum}
                        </Text>
                    </View>
                })}
            </View>

            <View style={{marginTop:"10px"}}>
                <View style={{padding:"3px",backgroundColor:"#E5E4E2",display:"flex",justifyContent:"center"}}>
                    <Text style={[styles.text,{fontSize:"12px",margin:0,fontFamily:"Times-Bold",lineHeight:"0"}]}>
                        A. Data Pemohon
                    </Text>
                </View>
                {listDataPemohon.map((dataPemohon,index)=>{
                    console.log(dataPemohon,"dataPemohon")
                    return <View key={index} style={{display:"flex",flexDirection:"row"}}>
                        <Text style={[styles.text,{width:"5%"}]}>
                            {index+1}. 
                        </Text>
                        <Text style={[styles.text,{width:"45%"}]}>
                            {dataPemohon["label"]} 
                        </Text>
                        <Text style={styles.text}>
                            :
                        </Text>
                        <Text style={[styles.text,{width:"50%"}]}>
                            {dataPemohon["value"]} 
                        </Text>
                    </View>
                })}
               

            </View>

            <View style={{marginTop:"10px"}}>
                <View style={{padding:"3px",backgroundColor:"#E5E4E2",display:"flex",justifyContent:"center"}}>
                    <Text style={[styles.text,{fontSize:"12px",margin:0,fontFamily:"Times-Bold",lineHeight:"0"}]}>
                        B. Keterangan Lokasi
                    </Text>
                </View>
                {listKeteranganLokasi.map((dataPemohon,index)=>{
                    return <View key={index} style={{display:"flex",flexDirection:"row"}}>
                        <Text style={[styles.text,{width:"5%"}]}>
                            {index+1}. 
                        </Text>
                        <Text style={[styles.text,{width:"45%"}]}>
                            {dataPemohon["label"]} 
                        </Text>
                        <Text style={styles.text}>
                            :
                        </Text>
                        <Text style={[styles.text,{width:"50%"}]}>
                            {dataPemohon["value"]} 
                        </Text>
                    </View>
                })}
                <View style={{display:"flex",alignItems:"center"}}>
                    {screenshoot && <Image src={screenshoot["basemap"]} style={{width:250,height:150,marginTop:5}}/>}
                </View>
            </View>

            <View style={{marginTop:"10px"}}>
                <View style={{padding:"3px",backgroundColor:"#E5E4E2",display:"flex",justifyContent:"center"}}>
                    <Text style={[styles.text,{fontSize:"12px",margin:0,fontFamily:"Times-Bold",lineHeight:"0"}]}>
                        C. Informasi Tata Ruang
                    </Text>
                </View>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"5%"}]}>
                        1. 
                    </Text>
                    <Text style={[styles.text,{width:"45%"}]}>
                        Pola Pemanfaatan Ruang
                    </Text>
                    <Text style={styles.text}>
                        :
                    </Text>
                    <Text style={[styles.text,{width:"50%"}]}>
                        
                    </Text>
                 </View>
                 <View style={{display:"flex",alignItems:"center",marginBottom:5}}>
                    {screenshoot && <Image src={screenshoot["rdtr"]} style={{width:250,height:150,marginTop:5}}/>}
                </View>

                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"5%"}]}>
                        2. 
                    </Text>
                    <Text style={[styles.text,{width:"45%"}]}>
                        Ketentuan Zonasi
                    </Text>
                    <Text style={styles.text}>
                        :
                    </Text>
                    <Text style={[styles.text,{width:"50%"}]}>
                        Pemanfaatan diizinkan (I)
                    </Text>
                 </View>
                
                <View>
                    <View style={{display:"flex",flexDirection:"row"}}>
                        <Text style={[styles.text,{width:"5%"}]}>
                            3. 
                        </Text>
                        <Text style={[styles.text,{width:"45%"}]}>
                            Intensitas
                        </Text>
                    </View>
                    <View style={{marginLeft:30}}>
                        <Text style={styles.text}>
                            Untuk luas tanah seluas {hasil.intensitas.luas} m2 maka aturannya sebagai berikut:
                        </Text>
                        {listIntensitas.map((intensitas,index)=>{
                            return  <View key={index} style={{display:"flex",flexDirection:"row"}}>
                                <Text style={[styles.text,{width:"50%"}]}>
                                    {intensitas["label"]}
                                </Text>
                                <Text style={styles.text}>
                                    :
                                </Text>
                                <Text style={[styles.text,{width:"50%"}]}>
                                    {intensitas["value"]}
                                </Text>
                            </View>
                        })}
                    </View>
                </View>

                {hasil.simulasi.syarat != "" && <div>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"5%"}]}>
                        4. 
                    </Text>
                    <Text style={[styles.text,{width:"45%"}]}>
                        Ketentuan Zonasi 
                    </Text>
                </View>
                <View style={{marginLeft:30,display:"flex",flexDirection:"column"}}>
                    {hasil.simulasi.syarat.split(";").map((syarat,index)=>{
                        if(syarat == "") return
                        return(
                            <View style={{display:"flex",flexDirection:"row"}} key={index}>
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
                
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={[styles.text,{width:"5%"}]}>
                        {hasil.simulasi.syarat == "" ? 4 : 5}
                    </Text>
                    <Text style={[styles.text,{width:"45%"}]}>
                        Garis Sempadan Bangunan 
                    </Text>
                </View>
                <View style={{marginLeft:30,display:"flex",flexDirection:"column"}}>
                    <Text style={styles.text}>
                        Peraturan Garis Sempadan Bangunan pada persil ini adalah:
                    </Text>
                    {hasil.dataZonasi.gsb.split(",").map((gsb,index)=>{
                        var remark = hasil.dataZonasi.remarkGsb.split(",")
                        gsb = gsb.trimStart()
                        var namaGsb = gsb == "GSB Jalan Lingkungan" ? "GSB Jalan Lingkungan" : remark[index].trimStart()
                        return(
                            <View style={{display:"flex",flexDirection:"row"}}>
                                <Text style={[styles.text,{width:"48%"}]}>
                                    {(String.fromCharCode(65+index)).toLowerCase()}. {namaGsb}
                                </Text>
                                <Text style={styles.text}>
                                    :
                                </Text>
                                <View style={{width:"50%",display:'flex',flexDirection:"column"}}>
                                    {namaGsb ==  "GSB Jalan Lingkungan" ?
                                        gsbJalanLingkungan.map((gsb)=>{
                                            return <Text style={[styles.text]}>{gsb}</Text>
                                        }) : 
                                        <Text style={[styles.text,{width:"50%"}]}>{gsb}</Text>
                                    }
                                </View>
                                
                            </View>
                        )
                    })}
                </View>
            </View>
            
            {
                hasil.dataZonasi.kawasan != "Tidak Ada" &&  <View style={{marginTop:"10px"}}>
                    <View style={{padding:"3px",backgroundColor:"#E5E4E2",display:"flex",justifyContent:"center"}}>
                        <Text style={[styles.text,{fontSize:"12px",margin:0,fontFamily:"Times-Bold",lineHeight:"0"}]}>
                            D. Keterangan Lain (Ketentuan Khusus & Informasi Lainnya) :
                        </Text>
                    </View>
                 
                    <View style={{marginLeft:30,display:"flex",flexDirection:"column"}}>
                        {hasil.ketentuan.gaya.split(";").map((syarat,index)=>{
                            return(
                                <View style={{display:"flex",flexDirection:"row"}}  key={index}>
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
                </View>
            }
           

            <View style={{display:"flex",alignItems:"flex-end"}}>
                <View style={{width:"50%",display:"flex",alignItems:"center",textAlign:"center",gap:"0.5rem"}}>
                    <Text style={[styles.text,{textAlign:"center"}]}>Yogyakarta, {hasil.dataPemohon?.date}</Text>
                    <Text style={[styles.text,{textAlign:"center"}]}>An. Kepala Dinas</Text>
                    <Text style={[styles.text,{textAlign:"center"}]}>KEPALA BIDANG TATA RUANG DINAS PERTANAHAN DAN TATA RUANG (KUNDHA NITI MANDALA SARTA TATA SASANA)</Text>
                    <Text style={[styles.text,{textAlign:"center",fontFamily: "Times-Bold",textDecoration:"underline",marginTop:70}]}>PAMUNGKAS, S.T., M.T.</Text>
                    <Text style={[styles.text,{textAlign:"center"}]}>NIP. 197512032005011005</Text>
                </View>
            </View>
        </Page>
  </Document>)
   
}

export default PdfKop