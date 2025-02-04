import React, { useState,useEffect,useRef } from 'react'
import "./Profile.css"
import {AiTwotoneDelete} from "react-icons/ai"
import * as WMS from "leaflet.wms";

import { MapContainer, TileLayer,useMap,GeoJSON} from "react-leaflet";
import L from "leaflet";
import Swal from "sweetalert2"

function ItemPelaporan({daftarSelected,feature,properties,index}){
  return (
    <div className='item-laporan' onClick={()=>daftarSelected(feature)} >
        <div style={{fontSize:"12px",fontWeight:"bold"}}>
            {index+1}.
        </div>
        <div style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
        <div style={{fontSize:"12px",fontWeight:"bold"}}>
          {properties.jenisLaporan}
        </div>
        <div style={{fontSize:"12px"}}>
          {properties.kecamatan}
        </div>
        <div style={{fontSize:"12px"}}>
          {properties.date}
        </div>
      </div>
    </div>
  )
}

function Pelaporan(){

  const [position, setPosition] = useState(false);
  const [dataLaporan, setDataLaporan] = useState(false)
  const [selectedPersil, setSelectedPersil] = useState(false)
  const [map, setMap] = useState(false)
  const [first, setFirst] = useState(true)
  const tileRef = useRef();

  useEffect(() => {
    const urlLaporan = `${process.env.REACT_APP_BASE_URL}/` + "laporan"
    fetch(urlLaporan,{
      method: 'GET',
      credentials: 'include'})
    .then(res=>res.json())
    .then(res=>{
      if(res != "unauthorized"){
        res.data.features.map((feature,index)=>{
          var date = new Date(feature.properties.tanggal);
          res.data.features[index].properties.date = date.toISOString().substring(0, 10)
        })
        setDataLaporan(res.data)
      }
    })
    .catch(err=>console.log(err))
  }, [])

  var CustomWMSLayer =  (props) => {
    var map = useMap();
      if(first){
        const { url, options, layers } = props;
        const source = WMS.source(url, options);
        var layer= source.getLayer(layers)
        layer.addTo(map);
        setFirst(false);
      }
    return null;
  }
  
  const ClickHandler = (feature, layer) => {
    layer.on({
      click: (e) => {
        var point = e.latlng;
        var laporanPersilSelected= []
        dataLaporan.features.map(feature=>{
          var geojsongroup = L.geoJSON(feature)
          if(geojsongroup.getBounds().contains(point)){
            laporanPersilSelected.push(feature)
          }
        })

        if(laporanPersilSelected.length === 1){
          const url = `${process.env.REACT_APP_BASE_URL}/` + "user/pelapor/" + feature.properties.pelapor
          fetch(url,{
            method:"GET",
            credentials:"include"
          })
          .then(res=>res.json())
          .then(res=>{
            feature.properties.namaPelapor=res.namaLengkap  
            setSelectedPersil([feature])
          })
        }else{
          setSelectedPersil(laporanPersilSelected)
        }

      }
    })
  }

  const daftarSelected = (feature) => {
    const url = `${process.env.REACT_APP_BASE_URL}/` + "user/pelapor/" + feature.properties.pelapor
        fetch(url,{
          method:"GET",
          credentials:"include"
        })
        .then(res=>res.json())
        .then(res=>{
          feature.properties.namaPelapor=res.namaLengkap  
          setSelectedPersil([feature])
        })
    setPosition([feature.geometry.coordinates[0][0][1],feature.geometry.coordinates[0][0][0]])
  }

  const ChangeView = center => {
    const map = useMap();
    map.setView(center.center);
    return null;
  }

  const SelectGeojson = () => {
    return <GeoJSON data={selectedPersil} style={{color:"yellow"}} />
  }

  const hapusLaporan = (feature) => {
    Swal.fire({
      title: 'Apa anda yakin ingin menghapusnya?',
      showDenyButton: true,
      confirmButtonText: 'Ya',
      icon: 'info',
      denyButtonText: `Tidak`,
    }).then((result) => {
      
      if (result.isConfirmed) {
        const url = `${process.env.REACT_APP_BASE_URL}/` + "laporan"
        fetch(url,{
          method:"DELETE",
          credentials:"include",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },body: JSON.stringify({
            idLaporan: feature._id,
          }),
        })
        .then(res=>res.json())
        .then(res=>{
          if(res.RTN){
            Swal.fire('Laporan berhasil dihapus', '', 'success')
          }else{
            Swal.fire('Laporan gagal dihapus', '', '')
          }
  
        } 
        ).catch(err=>console.log(err))
      }
    })
  }

  return(<div style={{position:"relative"}}>
    <MapContainer
      center={[-7.787178, 110.376075]}
      zoom={17}
      style={{ width: "1000px", height: "500px" }}
      zoomControl={false}
      whenReady={(e)=>setMap(e)}
    >
      <TileLayer ref={tileRef} url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" style={{opacity:"0.5"}} maxZoom={22} />
      <CustomWMSLayer
          url={process.env.REACT_APP_SERVER_GEOSERVER+"geoserver/sitaru/wms"}
          layers={"sitaru:Batas_Persil"}
          options={{
            format: "image/png",
            transparent: "true",
            tiled: "true",
            info_format: "application/json",
            identify: false,
            maxZoom: 22,
          }}
        />
      {position && <ChangeView center={position}/>}
      {selectedPersil && <SelectGeojson/> }
      {dataLaporan && <GeoJSON data={dataLaporan} onEachFeature={ClickHandler} style={{color:"red"}} />}
    </MapContainer>
    <div className='keterangan-laporan'>
    
            {selectedPersil ? selectedPersil.length === 1 ? <div className='isi-laporan'>
              <div className='item' style={{margin:"0px 0px"}}>
                  <p><b>Pelapor</b></p>
                  <p>{selectedPersil[0].properties.namaPelapor }</p>
                </div>
                <div className='item'>
                  <p><b>Tanggal</b></p>
                  <p>{selectedPersil[0].properties.date}</p>
                </div>
                <div className='item'>
                  <p><b>Jenis Laporan</b></p>
                  <p>{selectedPersil[0].properties.jenisLaporan}</p>
                  
                </div>
                <div className='item'>
                  <p><b>Keterangan</b></p>
                  <p>{selectedPersil[0].properties.keterangan}</p>
                </div>
                <div className='hapus' onClick={()=>hapusLaporan(selectedPersil[0])}>
                  <AiTwotoneDelete style={{width:"16px",height:"16px"}}/>
                </div>
              </div> 
              :
              <div className='isi-laporan'>
                {selectedPersil.map((feature,index)=>{
                var properties = feature.properties
                return  <ItemPelaporan daftarSelected={daftarSelected} properties={properties} feature={feature} key={index}/>
              })}
              </div>
              
              :
              
              <div></div>
            }
    </div>
  </div>)
}

function DataProfile({setOpen}){

  const [dataUser, setDataUser] = useState(false)

  useEffect(() => {
    const url = `${process.env.REACT_APP_BASE_URL}/` + "user"
    fetch(url,{method:"GET",credentials:"include"}).
    then(res=>res.json()).
    then(res=>{
      setDataUser(res)
    }).
    catch(err=>console.log(err))
  }, [])

  function signOut(){
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setOpen(false)
  }

  return <div className='data-diri'>
          {dataUser && <div>
            <b>Biodata</b>
            <div className='biodata'>
                <div className="text">
                  Nama Lengkap
                </div>
                <div className="text">
                  : 
                </div>
                <div className="text">
                  {dataUser.namaLengkap}
                </div>
                <div className="text">
                  Username
                </div>
                <div className="text">
                  :
                </div>
                <div className="text">
                  {dataUser.username}
                </div>
                <div className="text">
                  Alamat
                </div>
                <div className="text">
                  : 
                </div>
                <div className="text">
                  {dataUser.alamat}
                </div>
            </div>
            <b>Kontak</b>
            <div className='kontak'>
                <div className="text">
                  Nomor Hp
                </div>
                <div className="text">
                  :
                </div>
                <div className="text">
                  {dataUser.noHp}
                </div>
            </div>
            
          </div>}
          <button id="log-out" onClick={signOut}>
            Log Out
          </button>
      </div> 

}

function Profile({setOpen, user}) {

  const [fiturSelected, setFiturSelected] = useState("Pelaporan")

  return (
    <div className='pop-up'>
      <div className='profile'>
      
        <div className='fitur'>
          <div className='daftar-fitur'>
            <div className='fitur-choice' onClick={()=>setFiturSelected("Data Profile")} style={fiturSelected === "Data Profile" ? {color:"#0075eb",borderColor:"#0075eb"}: {color:"#383838",borderColor:"#383838"}}>
              <p>Data Profile</p>
            </div>
            <div className='fitur-choice' onClick={()=>setFiturSelected("Pelaporan")} style={fiturSelected === "Pelaporan" ? {color:"#0075eb",borderColor:"#0075eb"}: {color:"#383838",borderColor:"#383838"}}>
              <p>Pelaporan</p>
            </div>
          </div>
          <div className='isi'>
            {fiturSelected === "Data Profile" && <DataProfile user={user} setOpen={setOpen}/> } 
            {fiturSelected === "Pelaporan" && <Pelaporan/> } 
          </div>
        </div>
      </div>
      <div className='black-layer' onClick={()=>setOpen(false)}></div>
    </div>
  )

}

export default Profile