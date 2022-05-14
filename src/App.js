import "./App.css";
import Dashboard from "./pages/Dashboard";
import {Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
