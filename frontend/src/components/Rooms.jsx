"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import "./Rooms.css"

const Rooms = () => {
  // Sample data - in a real app, this would come from an API or database
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: "Central Hospital",
      rooms: [
        {
          id: 101,
          name: "Operating Room 1",
          floor: "1st Floor",
          type: "Surgery",
          status: "Available",
          lastCleaned: "2025-03-15",
          equipment: 12,
        },
        {
          id: 102,
          name: "Operating Room 2",
          floor: "1st Floor",
          type: "Surgery",
          status: "In Use",
          lastCleaned: "2025-03-14",
          equipment: 15,
        },
        {
          id: 103,
          name: "Recovery Room 1",
          floor: "2nd Floor",
          type: "Recovery",
          status: "Available",
          lastCleaned: "2025-03-16",
          equipment: 8,
        },
        {
          id: 104,
          name: "ICU Room 1",
          floor: "3rd Floor",
          type: "Intensive Care",
          status: "In Use",
          lastCleaned: "2025-03-13",
          equipment: 20,
        },
      ],
    },
    {
      id: 2,
      name: "Memorial Medical Center",
      rooms: [
        {
          id: 201,
          name: "Operating Room A",
          floor: "3rd Floor",
          type: "Surgery",
          status: "Available",
          lastCleaned: "2025-03-15",
          equipment: 14,
        },
        {
          id: 202,
          name: "ICU Room 1",
          floor: "4th Floor",
          type: "Intensive Care",
          status: "In Use",
          lastCleaned: "2025-03-12",
          equipment: 18,
        },
        {
          id: 203,
          name: "Recovery Bay 1",
          floor: "3rd Floor",
          type: "Recovery",
          status: "Available",
          lastCleaned: "2025-03-16",
          equipment: 6,
        },
      ],
    },
    {
      id: 3,
      name: "City General Hospital",
      rooms: [
        {
          id: 301,
          name: "Surgery Suite 1",
          floor: "Ground Floor",
          type: "Surgery",
          status: "Maintenance",
          lastCleaned: "2025-03-10",
          equipment: 16,
        },
        {
          id: 302,
          name: "Surgery Suite 2",
          floor: "Ground Floor",
          type: "Surgery",
          status: "Available",
          lastCleaned: "2025-03-15",
          equipment: 14,
        },
        {
          id: 303,
          name: "Recovery Bay A",
          floor: "1st Floor",
          type: "Recovery",
          status: "Available",
          lastCleaned: "2025-03-16",
          equipment: 7,
        },
        {
          id: 304,
          name: "Recovery Bay B",
          floor: "1st Floor",
          type: "Recovery",
          status: "In Use",
          lastCleaned: "2025-03-14",
          equipment: 7,
        },
        {
          id: 305,
          name: "ICU Room 1",
          floor: "2nd Floor",
          type: "Intensive Care",
          status: "Available",
          lastCleaned: "2025-03-15",
          equipment: 22,
        },
      ],
    },
    {
      id: 4,
      name: "University Hospital",
      rooms: [
        {
          id: 401,
          name: "Teaching OR 1",
          floor: "5th Floor",
          type: "Surgery/Teaching",
          status: "In Use",
          lastCleaned: "2025-03-13",
          equipment: 25,
        },
        {
          id: 402,
          name: "Research Lab",
          floor: "6th Floor",
          type: "Research",
          status: "Available",
          lastCleaned: "2025-03-16",
          equipment: 30,
        },
        {
          id: 403,
          name: "Recovery Room 1",
          floor: "5th Floor",
          type: "Recovery",
          status: "Available",
          lastCleaned: "2025-03-15",
          equipment: 10,
        },
      ],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [expandedHospital, setExpandedHospital] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [showRoomDetails, setShowRoomDetails] = useState(false)

  // Filter hospitals and rooms based on search term and filters
  const filteredHospitals = hospitals
    .map((hospital) => {
      const filteredRooms = hospital.rooms.filter((room) => {
        const matchesSearch =
          room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.floor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.type.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesType = filterType === "all" || room.type.includes(filterType)
        const matchesStatus = filterStatus === "all" || room.status === filterStatus

        return matchesSearch && matchesType && matchesStatus
      })

      return {
        ...hospital,
        rooms: filteredRooms,
        hasMatchingRooms: filteredRooms.length > 0,
      }
    })
    .filter((hospital) => hospital.hasMatchingRooms)

  // Toggle hospital expansion
  const toggleHospital = (hospitalId) => {
    setExpandedHospital(expandedHospital === hospitalId ? null : hospitalId)
  }

  // View room details
  const viewRoomDetails = (hospital, room) => {
    setSelectedRoom({ ...room, hospitalName: hospital.name })
    setShowRoomDetails(true)
  }

  // Close room details modal
  const closeRoomDetails = () => {
    setShowRoomDetails(false)
    setSelectedRoom(null)
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "#2ecc71" // Green
      case "In Use":
        return "#3498db" // Blue
      case "Maintenance":
        return "#e74c3c" // Red
      default:
        return "#7f8c8d" // Gray
    }
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="rooms-content">
          <div className="rooms-header">
            <h1>Hospital Rooms</h1>
            <div className="rooms-filters">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button className="clear-search" onClick={() => setSearchTerm("")}>
                    ×
                  </button>
                )}
              </div>
              <div className="filter-group">
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
                  <option value="all">All Types</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Recovery">Recovery</option>
                  <option value="Intensive Care">Intensive Care</option>
                  <option value="Research">Research</option>
                  <option value="Teaching">Teaching</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Statuses</option>
                  <option value="Available">Available</option>
                  <option value="In Use">In Use</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          <div className="hospitals-list">
            {filteredHospitals.length === 0 ? (
              <div className="no-results">
                <p>No rooms found matching your search.</p>
              </div>
            ) : (
              filteredHospitals.map((hospital) => (
                <div key={hospital.id} className="hospital-section">
                  <div className="hospital-header" onClick={() => toggleHospital(hospital.id)}>
                    <h2>{hospital.name}</h2>
                    <div className="hospital-info">
                      <span className="room-count">{hospital.rooms.length} rooms</span>
                      <span className={`expand-icon ${expandedHospital === hospital.id ? "expanded" : ""}`}>▼</span>
                    </div>
                  </div>

                  {expandedHospital === hospital.id && (
                    <div className="rooms-table-container">
                      <table className="rooms-table">
                        <thead>
                          <tr>
                            <th>Room Name</th>
                            <th>Floor</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Equipment</th>
                            <th>Last Cleaned</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hospital.rooms.map((room) => (
                            <tr key={room.id}>
                              <td>{room.name}</td>
                              <td>{room.floor}</td>
                              <td>{room.type}</td>
                              <td>
                                <span className="room-status" style={{ backgroundColor: getStatusColor(room.status) }}>
                                  {room.status}
                                </span>
                              </td>
                              <td>{room.equipment} items</td>
                              <td>{formatDate(room.lastCleaned)}</td>
                              <td>
                                <button className="view-btn" onClick={() => viewRoomDetails(hospital, room)}>
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Room Details Modal */}
      {showRoomDetails && selectedRoom && (
        <div className="room-details-overlay">
          <div className="room-details-modal">
            <div className="modal-header">
              <h2>{selectedRoom.name}</h2>
              <button className="close-btn" onClick={closeRoomDetails}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="room-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Hospital:</span>
                  <span className="detail-value">{selectedRoom.hospitalName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Floor:</span>
                  <span className="detail-value">{selectedRoom.floor}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{selectedRoom.type}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className="room-status" style={{ backgroundColor: getStatusColor(selectedRoom.status) }}>
                    {selectedRoom.status}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Equipment Count:</span>
                  <span className="detail-value">{selectedRoom.equipment} items</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Cleaned:</span>
                  <span className="detail-value">{formatDate(selectedRoom.lastCleaned)}</span>
                </div>
              </div>

              <div className="room-actions">
                <button className="action-btn schedule-btn">Schedule Cleaning</button>
                <button className="action-btn inventory-btn">View Inventory</button>
                <button className="action-btn maintenance-btn">Request Maintenance</button>
              </div>

              <div className="room-notes">
                <h3>Notes</h3>
                <p>
                  This is a sample note for {selectedRoom.name}. In a real application, this would contain important
                  information about the room, its usage history, and any special requirements or restrictions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Rooms

