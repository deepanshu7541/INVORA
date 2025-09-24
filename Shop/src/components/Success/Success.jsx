import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Import the green tick icon
import './Success.css'; // Import the CSS for styling

const Success = () => {
  return (
    <div className="success-page">
      <div className="success-content">
        <FaCheckCircle className="success-icon" /> {/* Green tick icon */}
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your order has been successfully placed.</p>
      </div>
    </div>
  );
};

export default Success;