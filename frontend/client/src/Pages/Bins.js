import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BinModal from "./BinModal";
import "../styles/Bins.css";

const Bins = () => {
  const [bins, setBins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedBin, setSelectedBin] = useState(null);
  const [modalType, setModalType] = useState(null); // 'edit', 'delete', or null
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Fetch bins from API
  useEffect(() => {
    const fetchBins = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/bins", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBins(response.data.bins);
      } catch (error) {
        console.error("Error fetching bins:", error);
      }
    };

    fetchBins();
  }, []);

  // ✅ Filter bins based on search term and type
  const filteredBins = bins.filter((bin) => {
    const matchesSearch =
      (bin.binNumber?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (bin.color?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || bin.color === filterType;

    return matchesSearch && matchesType;
  });

  // ✅ Open modal for edit/delete
  const handleBinAction = (bin, type) => {
    setSelectedBin(bin);
    setModalType(type);
    setIsModalOpen(true);
  };

  // ✅ Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBin(null);
    setModalType(null);
  };

  // ✅ Update or delete bin via API
  const handleSaveBin = async (updatedBin) => {
    try {
      if (modalType === "edit") {
        await axios.put(`http://localhost:3000/api/v1/bins/${updatedBin._id}`, updatedBin, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        // Update UI
        setBins((prevBins) => prevBins.map((bin) => (bin._id === updatedBin._id ? updatedBin : bin)));
      } else if (modalType === "delete") {
        await axios.delete(`http://localhost:3000/api/v1/bins/${selectedBin._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        // Remove from UI
        setBins((prevBins) => prevBins.filter((bin) => bin._id !== selectedBin._id));
      }
    } catch (error) {
      console.error("Error updating/deleting bin:", error);
    }
    handleCloseModal();
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="bins-content">
          <div className="bins-header">
            <h1>Inventory Bins</h1>
            <div className="bins-filters">
              <input
                type="text"
                placeholder="Search bins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All Bins</option>
                <option value="blue">Blue Bins</option>
                <option value="black">Black Bins</option>
              </select>
            </div>
          </div>

          <div className="bins-grid">
            {filteredBins.length > 0 ? (
              filteredBins.map((bin) => (
                <div key={bin._id} className={`bin-card ${bin.color}-bin`}>
                  <div className="bin-header">
                    <h2>{bin.binNumber}</h2>
                    <div className="bin-actions">
                      <button className="edit-btn" onClick={() => handleBinAction(bin, "edit")}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleBinAction(bin, "delete")}>
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="bin-details">
                    <p><strong>Color:</strong> {bin.color}</p>
                    <p><strong>Items:</strong> {bin.items.join(", ")}</p>
                    <p><strong>Room:</strong> {bin.room?.roomNumber || "N/A"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No bins found.</p>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <BinModal bin={selectedBin} modalType={modalType} onClose={handleCloseModal} onSave={handleSaveBin} />
      )}
    </div>
  );
};

export default Bins;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const Bins = () => {
//   const { roomId } = useParams();
//   const [bins, setBins] = useState([]);

//   useEffect(() => {
//     fetchBins();
//   }, []);

//   const fetchBins = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/v1/rooms/${roomId}/bins`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });

//       setBins(response.data.bins);
//     } catch (error) {
//       console.error("Error fetching bins:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Bins in This Room</h2>
//       <ul>
//         {bins.length > 0 ? (
//           bins.map((bin) => (
//             <li key={bin._id} style={{ backgroundColor: bin.color, padding: "10px", margin: "5px", color: "white" }}>
//               <strong>Bin {bin.binNumber}</strong>
//               <br />
//               🎨 <strong>Color:</strong> {bin.color.toUpperCase()}
//               <br />
//               📦 <strong>Items:</strong> {bin.items.length > 0 ? bin.items.join(", ") : "No items"}
//               <hr />
//             </li>
//           ))
//         ) : (
//           <p>No bins available in this room.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Bins;