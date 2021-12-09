import React, { useState, useRef } from "react";
import "./Simulasi.css";
import * as Ai from "react-icons/ai";
import * as Bs from "react-icons/bs";
import {IoMdArrowDropdown} from 'react-icons/io'

function SliderComponent({ label }) {
  const [sliderValue, setSliderValue] = useState(5);
  const [selector, setSelector] = useState(false);

  return (
    <div className="input-slider">
      <p> {label} </p>
      <div style={{position:"relative"}}>
        <input
          type="range"
          min="0"
          max="10"
          className="slider"
          onMouseEnter={()=>{setSelector(true)}}
          onMouseOut={()=>{setSelector(false)}}
          onChange={(e) => {
            setSliderValue(e.target.value);
          }}
        />
        {selector ? <div id="selector" style={{left: `calc(${sliderValue}*10%*0.93)`}}>
          <p > {sliderValue} </p>
        </div> : ""
        }
        
      </div>
    </div>
  );
}

function StatusPerizinan({setUrutan}) {
  return (
    <div className="status-perizinan">
      <p style={{fontSize:"15px",textAlign:"center",fontWeight:"bold"}}  > Status Perizinan </p> 
      <div className="izin">
          <h3>Memerlukan Izin Penggunaan Bersyarat</h3>
      </div>
      <div className="list-item-perizinan">
          <div className="item-perizinan">
            <Ai.AiOutlineCheckCircle style={{ width:"25px" ,height:"25px" ,color:"#10C8B9",marginRight:"10px"}}/>
            <h5>KDB Sesuai</h5>
          </div>
          <div className="item-perizinan close">
            <Ai.AiOutlineCloseCircle style={{ width:"25px" ,height:"25px" ,color:"red",marginRight:"10px"}}/>
            <h5>Tinggi Bangunan melebihi ketentuan</h5>
          </div>
          <div className="item-perizinan">
            <Ai.AiOutlineCheckCircle style={{ width:"25px" ,height:"25px" ,color:"#10C8B9",marginRight:"10px"}}/>
            <h5>KLB Sesuai</h5>
          </div>
          <div className="item-perizinan">
            <Ai.AiOutlineCheckCircle style={{ width:"25px" ,height:"25px" ,color:"#10C8B9",marginRight:"10px"}}/>
            <h5>KDH Sesuai</h5>
          </div>
      </div>
      <ButtonBack setUrutan={setUrutan}/>
    </div>
  );
}

function Perizinan({setUrutan}) {
  return (
    <div className="Perizinan" style={{ position: "relative" }}>
      <div style={{ display: "flex" }}>
        <InputComponent lebar="130px" label="Luas Tanah (m2)" />
        <div style={{ margin: "10px" }}/>
        <InputComponent lebar="130px" label="Luas Bangunan (m2)" />
      </div>
      <SliderComponent label="Total Tinggi Bangunan" />
      <SliderComponent label="Jumlah Lantai" />
      <div style={{marginTop:"10px", display:"flex",justifyContent:"space-between"}}>
        <ButtonBack setUrutan={setUrutan}  />
        <ButtonNext setUrutan={setUrutan} label="Cek Perizinan"/>
      </div>

    </div>
  );
}

function JenisKegiatan({ setUrutan }) {
  return (
    <div style={{ position: "relative" }}>
      <p style={{ fontWeight: "100", margin: "0px" }} >
        Pilih jenis kegiatan untuk melakukan simulasi
      </p>
      <form>
        <div style={{marginTop:"10px",paddingRight:"10px"}}>
            <InputComponent label="Jenis Kegiatan" lebar="100%" />
        </div>
        <div style={{marginTop:"10px",display:"flex",justifyContent:"end"}}>
            <ButtonNext setUrutan={setUrutan} label="Cek Simulasi" />
        </div>
      </form>
    </div>
  );
}

function InputComponent({ lebar, label }) {
  const [fokus, setFokus] = useState(false);
  const input = useRef(false)

  return (
    <div className="input">
      <p style={  fokus ? { color: "#673AB7",marginTop:"0px" } : input.current.value !== "" ? { color: "gray",marginTop:"0px" } : { color: "gray",marginTop:"20px" }} >
        {label}
      </p>
      <input type="text" ref={input} onFocus={() => {setFokus(!fokus)}}
        onBlur={() => {setFokus(!fokus)}}
        style={{width: lebar}}
        />
    </div>
  );
}

function ButtonNext({setUrutan ,label}){
    return(<button className="tombol next " onClick={() => {setUrutan(1)}}>
    <Bs.BsCheckCircleFill
      style={{
        color: "black",
        width: "15px",
        height: "15px",
        marginRight: "7px",
      }}
    />
    {label}
  </button>)
}

function ButtonBack({setUrutan ,label}){
    return(<button className="tombol back" onClick={() => {setUrutan(-1)}}>
    <Bs.BsCheckCircleFill
      style={{
        color: "white",
        width: "15px",
        height: "15px",
        marginRight: "7px",
      }}
    />
    Kembali
  </button>)
}

function Simulasi() {
  const [urutan, setUrutan] = useState(1);
  const [active, setActive] = useState(false)
  return (
    <div className="simulasi">
    <div className="dropdown" onClick={()=>setActive(!active)} >
        <p>Simulasi</p>
        <IoMdArrowDropdown style={active ? {marginRight:"20px",width:"22px",height:"22px"} : {marginRight:"20px",width:"22px",height:"22px" ,transform:"rotate(90deg)"}}/>
    </div>
    {active ? <div>
      {/* <div className="judul">
        <Fa.FaMapMarkerAlt style={{width: "20px",height: "20px",color: "#03DAC5"}}/>
        <p> Cagar Budaya </p>
    </div> */}
    <div style={{padding:"10px 20px 20px 20px"}}>
        {urutan === 1 ? (
            <JenisKegiatan setUrutan={(e) => setUrutan(urutan + e)} />
        ) : (urutan === 2 ?
            <Perizinan setUrutan={(e) => setUrutan(urutan + e)}/> :
            <StatusPerizinan setUrutan={(e) => setUrutan(urutan + e)}/>
        )}
    </div>  
    </div>:""}
   
    </div>
  );
}

export default Simulasi;
