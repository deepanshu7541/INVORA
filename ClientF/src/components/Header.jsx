import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import './Header.css'; // Assuming you have a CSS file for styling

const Header = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const handleLogout = () => {
    // Implement logout functionality
    navigate("/logout");
    console.log('Logging out...');
  };

  const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/v1/profile');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setProfile(data);
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProfile();
    }, []);
  
    if (loading) return <p>Loading profile...</p>;
    if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="header">
      <div className="user-section">
        <div className="user-info">
          <span className="user-name">{profile.name}</span>
          <span className="user-role">{profile.role}</span>
        </div>
        <div className="user-avatar">
          <Link to="/profile" className="avatar-link">{profile.name[0]}</Link>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;