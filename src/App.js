import "./App.css";
import Dashboard from "./pages/Dashboard";
import {Routes, Route, HashRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
