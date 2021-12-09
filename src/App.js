import "./App.css";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilPage from "./pages/ProfilPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilPage />} />
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
