import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all auth-related data
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Optional: clear everything
    // localStorage.clear();

    // Redirect after short delay
    const timeout = setTimeout(() => {
      navigate("/login");
    }, 2000); // or 0 for instant redirect

    return () => clearTimeout(timeout); // cleanup
  }, [navigate]);

  return (
    <div className='logout-main'>
      <h1>Logout Successful!</h1>
      <p>You will be redirected to the login page in 2 seconds...</p>
    </div>
  );
};

export default Logout;