import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Sidebar from './Pages/Sidebar';
import Dashboard from './Pages/Dashboard';
import Hospitals from './Pages/Hospitals';
import Rooms from './Pages/Rooms';
// import History from './components/History';
import Bins from './Pages/Bins';
import Login from './Pages/Login';
import Register from './Pages/Register';
// import Role from './components/Role';
// import CustomerManagement from './components/CustomerManagement';
// import HomeService from './components/HomeService';
// import MarketPlace from './components/MarketPlace';
// import Settings from './components/Settings';
import ShowcaseManagement from './Pages/ShowcaseManagement';
import UserManagement from './Pages/UserManagement';
import Logout from './Pages/Logout';
import AllRooms from './Pages/AllRooms';
import EditHospital from './Pages/EditHospital';
import AddHospitals from './Pages/AddHospitals';
import AllBins from './Pages/AllBins';
import Profile from './Pages/Profile';
import "./App.css";

const App = () => {
  return (
    <Router>
      <ToastContainer position='top-center' />
      <div className="App">
        {/* <Sidebar /> */}
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/rooms" element={<AllRooms />} />
            <Route path="/rooms/:id/bins" element={<Bins />} />
            <Route path="/hospitals/:hospitalId/rooms" element={<Rooms />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/edithospital/:id" element={<EditHospital />} />
            <Route path="/addhospital" element={<AddHospitals />} />
            {/* <Route path="/home-service" element={<HomeService />} /> */}
            {/* <Route path="/market-place" element={<MarketPlace />} /> */}
            {/* <Route path="/settings" element={<Settings />} /> */}
            <Route path="/showcase-management" element={<ShowcaseManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
            {/* <Route path="/history" element={<History />} /> */}
            <Route path="/bins" element={<AllBins />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="profile" element={<Profile />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;


// import { ToastContainer, toast } from 'react-toastify';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import {
//   Dashboard,
//   Login,
//   Register,
//   Role,
//   Hospitals,
//   CustomerManagement,
//   HomeService,
//   MarketPlace,
//   Settings,
//   ShowcaseManagement,
//   UserManagement,
//   Logout,
//   Rooms,
//   AllRooms,
//   EditHospital,
//   AddHospitals,
//   AllBins,
//   Bins
// } from "./Pages/index";


// const App = () => {
//   return (
//     <BrowserRouter>
//       <ToastContainer position='top-center' />
//       <main>
//         <Routes>
//         <Route path="/" element={<Dashboard />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/rooms" element={<AllRooms />} />
//           <Route path="/rooms/:id/bins" element={<Bins />} />
//           <Route path="/hospitals/:hospitalId/rooms" element={<Rooms />} />
//           <Route path="/hospitals" element={<Hospitals />} />
//           <Route path="edithospital/:id" element={<EditHospital />} />
//           <Route path="/addhospital" element={<AddHospitals />} />
//           <Route path="/home-service" element={<HomeService />} />
//           <Route path="/market-place" element={<MarketPlace />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/showcase-management" element={<ShowcaseManagement />} />
//           <Route path="/user-management" element={<UserManagement />} />
//           <Route path="/bins" element={<AllBins />} />
//           <Route path="/logout" element={<Logout />} />
//         </Routes>
//       </main>
//     </BrowserRouter>
//   );
// };

// export default App;
