import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Cards from "./Cards";
import Menubar from "../Components/Menubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";
// import Card from "../Components/Dashboard-card";
import { hospital, service, users, room } from "../Assets/index";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const [lastPurchasedItems, setLastPurchasedItems] = useState([
    { id: 1, name: "Surgical Gloves", quantity: 500, date: "2025-03-15", hospital: "Central Hospital" },
    { id: 2, name: "Scalpel Set", quantity: 20, date: "2025-03-14", hospital: "Memorial Medical Center" },
    { id: 3, name: "Suture Kit", quantity: 100, date: "2025-03-12", hospital: "City General Hospital" },
    { id: 4, name: "Surgical Masks", quantity: 1000, date: "2025-03-10", hospital: "University Hospital" },
  ]);

  const [recentHistory, setRecentHistory] = useState([
    {
      id: 1,
      action: "Item Transfer",
      details: "Transferred 50 Surgical Gloves from Central Hospital to Memorial Medical Center",
      date: "2025-03-16",
    },
    { id: 2, action: "New Purchase", details: "Purchased 500 Surgical Gloves", date: "2025-03-15" },
    { id: 3, action: "Item Used", details: "Used 5 Scalpel Sets at Central Hospital", date: "2025-03-14" },
    {
      id: 4,
      action: "Inventory Check",
      details: "Completed inventory check at City General Hospital",
      date: "2025-03-13",
    },
  ]);
  

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const fetchLuckyNumber = async () => {

    let axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
    }
    };

    try {
      const response = await axios.get("http://localhost:3000/api/v1/dashboard", axiosConfig);
      setData({ msg: response.data.msg, luckyNumber: response.data.secret });
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token === "") {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token]);

  const stats = {
    totalHospitals: 12,
    totalRooms: 156,
    totalRacks: 342,
    totalBins: 1248,
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-content">
          <h1>Surgical Inventory Dashboard</h1>
          <div className="stats-container">
            <div className="stat-card">
              <h3>Total Hospitals</h3>
              <p className="stat-number">{stats.totalHospitals}</p>
            </div>
            <div className="stat-card">
              <h3>Total Rooms</h3>
              <p className="stat-number">{stats.totalRooms}</p>
            </div>
            <div className="stat-card">
              <h3>Total Racks</h3>
              <p className="stat-number">{stats.totalRacks}</p>
            </div>
            <div className="stat-card">
              <h3>Total Bins</h3>
              <p className="stat-number">{stats.totalBins}</p>
            </div>
          </div>

          <Cards lastPurchasedItems={lastPurchasedItems} recentHistory={recentHistory} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


// import React, { useEffect, useState } from 'react'
// import Menubar from "../Components/Menubar";
// import MenuToggle from "../Components/MenuToggle";
// import Navbar from "../Components/Navbar";
// import Card from "../Components/Dashboard-card";
// import { hospital, service, users, room } from "../Assets/index";
// // import ChartComponent from "../Components/Chart";
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const Dashboard = () => {
//   const [showMenu, setShowMenu] = useState(false);

//   const handleMenuToggle = () => {
//     setShowMenu(!showMenu);
//   };

//   const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");
//   const [ data, setData ] = useState({});
//   const navigate = useNavigate();

  // const fetchLuckyNumber = async () => {

  //   let axiosConfig = {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //   }
  //   };

  //   try {
  //     const response = await axios.get("http://localhost:3000/api/v1/dashboard", axiosConfig);
  //     setData({ msg: response.data.msg, luckyNumber: response.data.secret });
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // }
  
//   useEffect(() => {
//     // fetchLuckyNumber();
//     if(token === ""){
//       navigate("/login");
//       toast.warn("Please login first to access dashboard");
//     }
//   }, [token]);

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="flex flex-grow">
//         <div
//           className={`w-1/4 h-full bg-gray-200 ${
//             showMenu ? "" : "hidden"
//           } lg:block`}>
//           <Menubar />
//         </div>
//         <div className="flex-1 sm:relative">
//           <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
//           <div className="h-16 bg-white shadow-md">
//             <Navbar pagename={"Dashboard"} />
//           </div>
//           <div className="flex flex-wrap justify-between mt-10 mx-4 sm:justify-start">
//             <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4">
//               <Card
//                 title={"30"}
//                 subtitle={"Total Hospitals"}
//                 icon={hospital}
//                 color={"bg-gradient-to-r from-cyan-500 to-blue-500"}
//               />
//             </div>
//             <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4">
//               <Card
//                 title={"15"}
//                 subtitle={"Total Rooms Available"}
//                 icon={room}
//                 color={"bg-gradient-to-r from-purple-500 to-pink-500"}
//               />
//             </div>
//             <div className="w-full lg:w-1/4 px-2 mb-4">
//               <Card
//                 title={"1.2K"}
//                 subtitle={"Products available"}
//                 icon={service}
//                 color={"bg-gradient-to-r from-amber-400 to-amber-600"}
//               />
//             </div>
//             <div className="w-full lg:w-1/4 px-2 mb-4">
//               <Card
//                 title={"50K"}
//                 subtitle={"New Users"}
//                 icon={users}
//                 color={"bg-gradient-to-r from-lime-400 to-lime-600"}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
