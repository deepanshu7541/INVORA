import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Menubar from "../Components/Menubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";

const EditHospital = () => {
  const { id } = useParams(); // ✅ Get hospital ID from URL
  const navigate = useNavigate();
  const [hospital, setHospital] = useState({ hosp_name: "", address: "" });
  const [showMenu, setShowMenu] = useState(false);
  
const handleMenuToggle = () => {
    setShowMenu(!showMenu);
};

  useEffect(() => {
    fetchHospitalDetails();
  }, []);

  // ✅ Fetch Hospital Details
  const fetchHospitalDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`http://localhost:3000/api/v1/hospitals/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.data.hospital) {
        setHospital(response.data.hospital);
      }
    } catch (error) {
      console.error("Error fetching hospital details:", error);
    }
  };

  // ✅ Handle Form Submission (Update Hospital)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:3000/api/v1/hospitals/${id}`, hospital, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      alert("Hospital updated successfully");
      navigate("/hospitals");
    } catch (error) {
      console.error("Error updating hospital:", error);
      alert("Failed to update hospital");
    }
  };

  return (
    <div className="flex">
      <div
        className={`w-1/4 h-auto h-screen bg-gray-200 text-gray-500 ${
          showMenu ? "" : "hidden"
        } lg:block`}>
        <Menubar />
      </div>
      <div className="w-3/4 h-screen">
        <Navbar pagename={"Edit Hospital"} />
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <div>
      {/* <h2>Edit Hospital</h2> */}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Hospital Name</label>
          <input
            type="text"
            value={hospital.hosp_name}
            onChange={(e) => setHospital({ ...hospital, hosp_name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            value={hospital.address}
            onChange={(e) => setHospital({ ...hospital, address: e.target.value })}
            required
          />
        </div>
        <button type="submit">Update Hospital</button>
      </form>
    </div>
      </div>
    </div>
  );
};

export default EditHospital;