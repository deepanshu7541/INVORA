"use client"

import { useState, useEffect } from "react"
import "./RoomModal.css"

const RoomModal = ({ hospital, room, modalType, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    floor: "",
    type: "",
  })

  useEffect(() => {
    if (room) {
      setFormData({
        id: room.id,
        name: room.name,
        floor: room.floor,
        type: room.type,
      })
    }
  }, [room])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const getModalTitle = () => {
    switch (modalType) {
      case "view":
        return `View Room: ${room.name}`
      case "edit":
        return `Edit Room: ${room.name}`
      case "delete":
        return `Delete Room: ${room.name}`
      default:
        return "Room Details"
    }
  }

  return (
    <div className="modal-overlay">
      <div className="room-modal">
        <div className="modal-header">
          <h2>{getModalTitle()}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          {modalType === "delete" ? (
            <div className="delete-confirmation">
              <p>Are you sure you want to delete this room?</p>
              <p>
                <strong>Hospital:</strong> {hospital.name}
              </p>
              <p>
                <strong>Room:</strong> {room.name}
              </p>
              <p>
                <strong>Floor:</strong> {room.floor}
              </p>
              <p>
                <strong>Type:</strong> {room.type}
              </p>
              <div className="delete-warning">
                <p>This action cannot be undone.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Room Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={modalType === "view"}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="floor">Floor</label>
                <input
                  type="text"
                  id="floor"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  disabled={modalType === "view"}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Room Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  disabled={modalType === "view"}
                  required
                >
                  <option value="">Select a type</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Recovery">Recovery</option>
                  <option value="Intensive Care">Intensive Care</option>
                  <option value="Research">Research</option>
                  <option value="Surgery/Teaching">Surgery/Teaching</option>
                  <option value="Storage">Storage</option>
                </select>
              </div>

              <div className="form-group">
                <label>Hospital</label>
                <input type="text" value={hospital.name} disabled />
              </div>

              {modalType !== "view" && (
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className={modalType === "edit" ? "save-btn" : "delete-confirm-btn"}>
                    {modalType === "edit" ? "Save Changes" : "Confirm Delete"}
                  </button>
                </div>
              )}

              {modalType === "view" && (
                <div className="modal-actions">
                  <button type="button" className="close-view-btn" onClick={onClose}>
                    Close
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default RoomModal

