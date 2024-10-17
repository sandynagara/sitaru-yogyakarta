import "./App.css";
import Dashboard from "./pages/Dashboard";
import {Routes, Route, BrowserRouter,Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PetaLibrary from "./pages/PetaLibrary";
import Regulasi from "./pages/Regulasi";
import Permohonan from "./pages/Permohonan";
import FormPdfContainer from "./pages/FormPdfContainer";
import NotFound from "./pages/NotFound";
import ScreenshootContext from "./component/Context/ScreenshootContext";
import React, { useState,useEffect } from 'react'
import { Provider } from 'react-redux';

function App({ store }) {
  const [screenshoot, setScreenshoot] = useState(false);
  const [takePhoto, setTakePhoto] = useState(false);
  const [result, setResult] = useState(false);

  return (
    <Provider store={store}>
      <div className="App">
        <ScreenshootContext.Provider value={{takePhoto,setTakePhoto,screenshoot,setScreenshoot,result, setResult}}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={ <Navigate to={'/404'}/>}/>
              <Route path="/" element={<LandingPage />}/>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/dashboard/pdf" element={<FormPdfContainer />}/>
              <Route path="/peta" element={<PetaLibrary />}/>
              <Route path="/regulasi" element={<Regulasi />}/>
              <Route path="/permohonan" element={<Permohonan />}/>
              <Route path="/404" element={<NotFound />}/>
            </Routes>
          </BrowserRouter>
        </ScreenshootContext.Provider>
      </div>
    </Provider>
  );
}

export default App;
