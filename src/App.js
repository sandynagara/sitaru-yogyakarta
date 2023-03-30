import "./App.css";
import Dashboard from "./pages/Dashboard";
import {Routes, Route, Router,BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PetaLibrary from "./pages/PetaLibrary";
import Regulasi from "./pages/Regulasi";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/peta" element={<PetaLibrary />}/>
          <Route path="/regulasi" element={<Regulasi />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
