import "./App.css";
import Dashboard from "./pages/Dashboard";
import {Routes, Route, HashRouter,BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PetaLibrary from "./pages/PetaLibrary";
import Regulasi from "./pages/Regulasi";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/peta" element={<PetaLibrary />}/>
          <Route path="/regulasi" element={<Regulasi />}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
