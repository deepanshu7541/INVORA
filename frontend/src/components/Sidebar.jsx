import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Sidebar.css"

const Sidebar = () => {
  const location = useLocation()
  const [activeItem, setActiveItem] = useState(location.pathname === "/" ? "dashboard" : location.pathname.substring(1))

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊", path: "/" },
    { id: "hospitals", label: "Hospitals", icon: "🏥", path: "/hospitals" },
    { id: "rooms", label: "Rooms", icon: "🚪", path: "/rooms" },
    { id: "racks", label: "Racks", icon: "🗄️", path: "/racks" },
    { id: "bins", label: "Bins", icon: "📦", path: "/bins" },
    { id: "shop", label: "Shop", icon: "🛒", path: "/shop" },
    { id: "history", label: "History", icon: "📜", path: "/history" },
  ]

  const handleItemClick = (itemId) => {
    setActiveItem(itemId)
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Surgical Inventory</h2>
      </div>
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.id}
            className={`sidebar-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => handleItemClick(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar

