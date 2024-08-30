import "./App.css";
import Dashboard from "./pages/Dashboard";
import {Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PetaLibrary from "./pages/PetaLibrary";
import Regulasi from "./pages/Regulasi";
import Permohonan from "./pages/Permohonan";
import FormPdfContainer from "./pages/FormPdfContainer";
import ScreenshootContext from "./component/Context/ScreenshootContext";
import React, { useState,useEffect } from 'react'

function App() {
  const [screenshoot, setScreenshoot] = useState(false);
  const [takePhoto, setTakePhoto] = useState(false);
  const [result, setResult] = useState(false);

  return (
    <div className="App">
      <ScreenshootContext.Provider value={{takePhoto,setTakePhoto,screenshoot,setScreenshoot,result, setResult}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/dashboard/pdf" element={<FormPdfContainer />}/>
            <Route path="/peta" element={<PetaLibrary />}/>
            <Route path="/regulasi" element={<Regulasi />}/>
            <Route path="/permohonan" element={<Permohonan />}/>
          </Routes>
        </BrowserRouter>
      </ScreenshootContext.Provider>
    </div>
  );
}

export default App;
