import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Hospitals from './components/Hospitals';
import Rooms from './components/Rooms';
import History from './components/History';
import Bins from './components/Bins';

// import  './components/Dashboard.jsx';
// import  './components/Hospitals.jsx';
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Sidebar/> */}
        {/* <Dashboard/>
        <Hospitals/> */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/bins" element={<Bins />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App