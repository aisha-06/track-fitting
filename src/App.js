import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DepotStaffDashboard from "./components/DepotStaffDashboard";
import SeniorOfficialDashboard from "./components/SeniorOfficialDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/depot-staff" element={<DepotStaffDashboard />} />
        <Route path="/senior-official" element={<SeniorOfficialDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
