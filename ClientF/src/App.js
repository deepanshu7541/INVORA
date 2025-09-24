import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Hospitals from './components/Hospitals';
import Rooms from './components/Rooms';
import History from './components/History';
import Bins from './components/Bins';
import Racks from "./components/Racks"
import Profile from "./components/Profile"
import Logout from "./components/Logout"
import Login from "./components/Login"
import Register from "./components/Register";
import Contact from './components/Contact';
import Nurse from './components/Nurse';

import Inventory from './pages/Inventory/Inventory';
import Cart from './pages/Cart/Cart';
// import Profile from './pages/Profile/Profile.jsx';
// import Logout from './pages/Logout';
// import Success from './components/Success/Success';
import { CartProvider } from './context/CartContext';

// import  './components/Dashboard.jsx';
// import  './components/Hospitals.jsx';
import "./App.css"
const isAuthenticated = localStorage.getItem("auth");

function App() {
  return (
    <CartProvider>
    <Router>
      <div className="App">
        {/* <Sidebar/> */}
        {/* <Dashboard/>
        <Hospitals/> */}
        <Routes>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/bins" element={<Bins />} />
          <Route path="/racks" element={<Racks />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/shop" element={<Inventory />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/nurse" element={<Nurse />} />
          {/* <Route path="/success" element={<Success />} /> */}
        </Routes>
      </div>
    </Router>
    </CartProvider>
  )
}

export default App