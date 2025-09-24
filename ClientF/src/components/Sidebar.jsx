import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(
    location.pathname === "/" ? "dashboard" : location.pathname.substring(1)
  );
  const [collapsed, setCollapsed] = useState(false);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const userRole = auth?.user?.role;

  const baseMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊", path: "/" },
    { id: "hospitals", label: "Hospitals", icon: "🏥", path: "/hospitals" },
    { id: "rooms", label: "Rooms", icon: "🚪", path: "/rooms" },
    { id: "racks", label: "Racks", icon: "🗄️", path: "/racks" },
    { id: "bins", label: "Bins", icon: "📦", path: "/bins" },
    { id: "shop", label: "Shop", icon: "🛒", path: "http://localhost:5173/shop" },
    { id: "history", label: "History", icon: "📜", path: "/history" },
  ];

  // Conditionally include the Nurse menu only if user is admin
  if (userRole === "admin") {
    baseMenuItems.push({ id: "nurse", label: "Nurse", icon: "👤", path: "/nurse" });
  }

  const handleItemClick = (item) => {
    if (item.id === "shop") {
      window.location.href = item.path;
    } else {
      setActiveItem(item.id);
    }
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const path = location.pathname === "/" ? "dashboard" : location.pathname.substring(1);
    setActiveItem(path);
  }, [location]);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          {collapsed ? (
            <div className="logo">I</div>
          ) : (
            <img src="./logu.png" alt="Surgical System Logo" className="sidebar-logo" />
          )}
        </div>
        <button className="collapse-btn" onClick={toggleSidebar}>
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <div className="sidebar-divider">
        <span>{collapsed ? "Menu" : "Main Menu"}</span>
      </div>

      <div className="sidebar-menu">
        {baseMenuItems.map((item) => (
          <Link
            to={item.id === "shop" ? "#" : item.path}
            key={item.id}
            className={`sidebar-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => handleItemClick(item)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {!collapsed && <span className="sidebar-label">{item.label}</span>}
            {activeItem === item.id && <span className="active-indicator"></span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./Sidebar.css";

// const Sidebar = () => {
//   const location = useLocation();
//   const [activeItem, setActiveItem] = useState(
//     location.pathname === "/" ? "dashboard" : location.pathname.substring(1)
//   );
//   const [collapsed, setCollapsed] = useState(false);

//   // Read auth data from localStorage
//   const auth = JSON.parse(localStorage.getItem("auth"));
//   const userRole = auth?.user?.role; // will be "admin" or "nurse"

//   // Conditionally add the Nurse item if the role is admin
//   if (userRole === "admin") {
//     menuItems.push({ id: "nurse", label: "Nurse", icon: "👤", path: "/nurse" });
//   }

//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: "📊", path: "/" },
//     { id: "hospitals", label: "Hospitals", icon: "🏥", path: "/hospitals" },
//     { id: "rooms", label: "Rooms", icon: "🚪", path: "/rooms" },
//     { id: "racks", label: "Racks", icon: "🗄️", path: "/racks" },
//     { id: "bins", label: "Bins", icon: "📦", path: "/bins" },
//     { id: "shop", label: "Shop", icon: "🛒", path: "http://localhost:5173/shop" },
//     { id: "history", label: "History", icon: "📜", path: "/history" },
//     { id: "nurse", label: "Nurse", icon: "👤", path: "/nurse", roles: ["admin"] },
//   ];

//   const handleItemClick = (item) => {
//     if (item.id === "shop") {
//       window.location.href = item.path;
//     } else {
//       setActiveItem(item.id);
//     }
//   };

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   useEffect(() => {
//     const path =
//       location.pathname === "/" ? "dashboard" : location.pathname.substring(1);
//     setActiveItem(path);
//   }, [location]);

//   return (
//     <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//       <div className="sidebar-header">
//         <div className="logo-container">
//           {collapsed ? (
//             <div className="logo">I</div>
//           ) : (
//             <img
//               src="./logu.png"
//               alt="Surgical System Logo"
//               className="sidebar-logo"
//             />
//           )}
//         </div>
//         <button className="collapse-btn" onClick={toggleSidebar}>
//           {collapsed ? "→" : "←"}
//         </button>
//       </div>

//       <div className="sidebar-divider">
//         <span>{collapsed ? "Menu" : "Main Menu"}</span>
//       </div>

//       <div className="sidebar-menu">
//         {menuItems.map((item) => (
//           <Link
//             to={item.id === "shop" ? "#" : item.path} // Prevents React Router from handling external links
//             key={item.id}
//             className={`sidebar-item ${activeItem === item.id ? "active" : ""}`}
//             onClick={() => handleItemClick(item)}
//           >
//             <span className="sidebar-icon">{item.icon}</span>
//             {!collapsed && <span className="sidebar-label">{item.label}</span>}
//             {activeItem === item.id && <span className="active-indicator"></span>}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;