import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Implement logout functionality
    navigate("/logout");
    console.log('Logging out...');
  };

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const currentUserEmail = auth?.user?.email;
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/v1/users');
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setProfile(data.users);
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
    const userProfile = profile.find(user => user.email === currentUserEmail);
    if (!userProfile) return <p>No matching profile found.</p>;

  return (
    <div className="header">
      <div className="user-section">
        <div className="user-info">
          <span className="user-name">{userProfile.name}</span>
          <span className="user-role">{userProfile.role}</span>
        </div>
        <div className="user-avatar">
          <Link to="/profile" className="avatar-link">{userProfile.name[0]}</Link>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;