import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaTools, FaCut, FaStethoscope, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    { name: 'Basic Tools', icon: <FaTools /> },
    { name: 'Cutting Tools', icon: <FaCut /> },
    { name: 'Surgical Tools', icon: <FaStethoscope /> },
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop/?category=${encodeURIComponent(categoryName)}`);
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' && !location.search;
    }
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <a href="http://localhost:3001">
          <img src="/talented.png" alt="Surgical Inventory Logo" className="sidebar-logo" />
        </a>
        {/* <img src="../../../public/talented.png" alt="Surgical Inventory Logo" className="sidebar-logo" /> */}
      </div>
      
      <nav className="sidebar-nav">
        <button 
          onClick={() => navigate('/shop')} 
          className={`nav-item ${isActive('/shop') ? 'active' : ''}`}
        >
          <FaHome /> <span>All Items</span>
        </button>

        <div className="nav-section">
          <div className="nav-section-title">Categories</div>
          {categories.map((category, index) => (
            <button 
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className={`nav-item ${location.search === `?category=${encodeURIComponent(category.name)}` ? 'active' : ''}`}
            >
              {category.icon} <span>{category.name}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <button 
          onClick={() => navigate('/profile')} 
          className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
        >
          <FaUser /> <span>Profile</span>
        </button>
        <button onClick={() => navigate('/logout')} className="nav-item">
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;