import React, { useEffect, useState } from "react";
import Menubar from "../Components/Menubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import RoomModal from "./RoomModal";
import axios from "axios";
import "../styles/Hospitals.css";

const Hospitals = () => {
  const [showMenu, setShowMenu] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalType, setModalType] = useState(null); // 'view', 'edit', 'delete', or null
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);

  };
    const [hospitals, setHospitals] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchHospitals();
    }, []);

    const fetchHospitals = async () => {
        try {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found, please log in.");
            return;
        }

        const response = await axios.get("http://localhost:3000/api/v1/hospitals", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.data.hospitals) {
            setHospitals(response.data.hospitals);
        }
        } catch (error) {
        console.error("Error fetching hospitals:", error);
        }
    };

    // ✅ Delete Hospital
    const handleDelete = async (id) => {
        try {
        const token = localStorage.getItem("token");

        await axios.delete(`http://localhost:3000/api/v1/hospitals/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        alert("Hospital deleted successfully");
        fetchHospitals(); // ✅ Refresh list after deletion
        } catch (error) {
        console.error("Error deleting hospital:", error);
        alert("Failed to delete hospital");
        }
    };

    // ✅ Navigate to Edit Page
    const handleEdit = (id) => {
        navigate(`/edithospital/${id}`);
    };

    // Filter hospitals based on search term
    const filteredHospitals = hospitals.filter(
      (hospital) =>
        (hospital?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (hospital?.address?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

  // Handle opening the modal for different actions
  const handleRoomAction = (hospital, room, type) => {
    setSelectedHospital(hospital);
    setSelectedRoom(room);
    setModalType(type);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHospital(null);
    setSelectedRoom(null);
    setModalType(null);
  };

  // Handle saving changes to a room
  const handleSaveRoom = (updatedRoom) => {
    if (modalType === "edit") {
      // Update the room in the hospital
      const updatedHospitals = hospitals.map((hospital) => {
        if (hospital.id === selectedHospital.id) {
          const updatedRooms = hospital.rooms.map((room) => (room.id === updatedRoom.id ? updatedRoom : room));
          return { ...hospital, rooms: updatedRooms };
        }
        return hospital;
      });
      setHospitals(updatedHospitals);
    } else if (modalType === "delete") {
      // Remove the room from the hospital
      const updatedHospitals = hospitals.map((hospital) => {
        if (hospital.id === selectedHospital.id) {
          const updatedRooms = hospital.rooms.filter((room) => room.id !== selectedRoom.id);
          return { ...hospital, rooms: updatedRooms };
        }
        return hospital;
      });
      setHospitals(updatedHospitals);
    }
    handleCloseModal();
  };


  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="hospitals-content">
          <div className="hospitals-header">
            <h1>Hospitals</h1>
            <div className="hospitals-search">
              <input
                type="text"
                placeholder="Search hospitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="hospitals-list">
            {hospitals.map((hospital) => (
              <div key={hospital._id} className="hospital-card">
                <div className="hospital-info">
                  <h2>{hospital.hosp_name}</h2>
                  <p>
                    <strong>Address:</strong> {hospital.address}
                  </p>
                  {/* <p>
                    <strong>Phone:</strong> {hospital.phone}
                  </p> */}
                  {/* <p>
                    <strong>Total Rooms:</strong> {hospital.rooms.length}
                  </p> */}
                </div>

                <div className="hospital-rooms">
                  <h3>Rooms</h3>
                  <div className="rooms-table-container">
                    <table className="rooms-table">
                      <thead>
                        <tr>
                          <th>Room Name</th>
                          <th>Floor</th>
                          <th>Type</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hospital.rooms.map((room) => (
                          <tr key={room.id}>
                            <td>{room.name}</td>
                            <td>{room.floor}</td>
                            <td>{room.type}</td>
                            <td className="room-actions">
                              <button className="view-btn" onClick={() => handleRoomAction(hospital, room, "view")}>
                                View
                              </button>
                              <button className="edit-btn" onClick={() => handleRoomAction(hospital, room, "edit")}>
                                Edit
                              </button>
                              <button className="delete-btn" onClick={() => handleRoomAction(hospital, room, "delete")}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}

            {filteredHospitals.length === 0 && (
              <div className="no-results">
                <p>No hospitals found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <RoomModal
          hospital={selectedHospital}
          room={selectedRoom}
          modalType={modalType}
          onClose={handleCloseModal}
          onSave={handleSaveRoom}
        />
      )}
    </div>

    // <div className="flex">
    //   <div
    //     className={`w-1/4 h-auto bg-gray-200 text-gray-500 ${
    //       showMenu ? "" : "hidden"
    //     } lg:block`}>
    //     <Menubar />
    //   </div>
    //   <div className="w-full h-screen">
    //     <Navbar pagename={"Manage Hospitals"} />
    //     <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
    //     <div>
    //   {/* <h3>Manage Hospitals</h3> */}
    //   <Link to="/addhospital">➕ Add Hospital</Link>

    //   <ul>
    //     {hospitals.length > 0 ? (
    //       hospitals.map((hospital) => (
    //         <li key={hospital._id} style={{ marginBottom: "10px" }}>
    //           <strong>{hospital.hosp_name}</strong> - {hospital.address}
              
    //           {/* 🏥 View Rooms Button */}
    //           <button
    //             onClick={() => navigate(`/hospitals/${hospital._id}/rooms`)}
    //             style={{ marginLeft: "10px" }}
    //           >
    //             🏥 View Rooms
    //           </button>

    //           {/* ✏️ Edit Button */}
    //           <button 
    //             onClick={() => handleEdit(hospital._id)} 
    //             style={{ marginLeft: "10px", background: "yellow", cursor: "pointer" }}
    //           >
    //             ✏️ Edit
    //           </button>

    //           {/* 🗑️ Delete Button */}
    //           <button 
    //             onClick={() => handleDelete(hospital._id)} 
    //             style={{ marginLeft: "10px", background: "red", color: "white", cursor: "pointer" }}
    //           >
    //             🗑️ Delete
    //           </button>
    //         </li>
    //       ))
    //     ) : (
    //       <p>No hospitals found.</p>
    //     )}
    //   </ul>
    // </div>
    //   </div>
    // </div>
  );
};

export default Hospitals;