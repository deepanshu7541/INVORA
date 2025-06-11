// import React from 'react'
// import Sidebar from '../components/Sidebar';
// import Header from './Header';

// export default function Contact() {
//   return (
//     <div className="dashboard-container">
//         <Sidebar />
//         {/* <Header /> */}
//         <div>
//             <form>
//                 <h1>Contact Us</h1>
//                 <div>
//                 <label htmlFor="name">Name:</label>
//                 <input type="text" id="name" name="name" required />
//                 </div>
//                 <div>
//                 <label htmlFor="email">Email:</label>
//                 <input type="email" id="email" name="email" required />
//                 </div>
//                 <div>
//                 <label htmlFor="message">Message:</label>
//                 <textarea id="message" name="message" rows="4" required></textarea>
//                 </div>
//                 <button type="submit">Submit</button>
//                 <button type="reset">Reset</button>
//                 <button type="button" onClick={() => window.location.href = '/'}>Home</button>
//                 <button type="button" onClick={() => window.location.href = '/profile'}>Profile</button>
//                 <button type="button" onClick={() => window.location.href = '/logout'}>Logout</button>
//             </form>
//             </div>
//     </div>
//   )
// }


/* Vulnerable code (XSS) */

import React, { useState } from 'react';

export default function VulnerableContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vulnerable: Directly storing and displaying unsanitized user input
    setSubmittedData(formData);
    alert('Form submitted (vulnerably)!');
  };

  return (
    <div className="contact-form">
      <h1>Contact Us (Vulnerable)</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea 
            id="message" 
            name="message" 
            rows="4" 
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className="submitted-data">
          <h2>Your Submission:</h2>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <div dangerouslySetInnerHTML={{ __html: submittedData.message }} />
        </div>
      )}

      <div className="xss-demo">
        <h3>Try this XSS payload in the message field:</h3>
        <code>
          {'<script>alert("XSS Attack!");</script>'}
        </code>
        <p>Or this image-based XSS:</p>
        <code>
          {'<img src="x" onerror="alert(\'XSS via image!\')" />'}
        </code>
      </div>
    </div>
  );
}
