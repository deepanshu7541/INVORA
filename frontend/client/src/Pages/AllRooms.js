import React, { useEffect, useState } from "react";
import axios from "axios";
import Menubar from "../Components/Menubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";
// import { AllRooms } from ".";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  
    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    };

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/allrooms", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setRooms(response.data.rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  return (
    <div className="flex">
      <div
        className={`w-1/4 h-auto bg-gray-200 text-gray-500 ${
          showMenu ? "" : "hidden"
        } lg:block`}>
        <Menubar />
      </div>
      <div className="w-full h-screen">
        <Navbar pagename={"All Rooms"} />
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <div>
      {/* <h2>Available Rooms</h2> */}
      <ul>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <li key={room._id}>
              <strong>Room {room.roomNumber} - {room.type}</strong> 
              <br />
              🏥 <strong>Hospital:</strong> {room.hospital?.hosp_name || "Unknown"}
              <br />
              📍 <strong>Address:</strong> {room.hospital?.address || "Not Available"}
              <br />
              ✅ <strong>Availability:</strong> {room.isAvailable ? "Available" : "Occupied"}
              <hr />
            </li>
          ))
        ) : (
          <p>No rooms available.</p>
        )}
      </ul>
    </div>
      </div>
    </div>
  );
};

export default AllRooms;