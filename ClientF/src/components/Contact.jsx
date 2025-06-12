import React, { useState } from 'react';
import './Contactus.css';
import Sidebar from './Sidebar';
import Header from './Header';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedName = DOMPurify.sanitize(form.name);
    const sanitizedEmail = DOMPurify.sanitize(form.email);
    const sanitizedMessage = DOMPurify.sanitize(form.message);

    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
      return toast.error('Please fill all fields');
    }

    const sanitizedData = {
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
    };

    try {
      // Replace with real API if needed
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(sanitizedData),
      // });

      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="contactus-container">
      <Sidebar />
      <Header />

      <div className="contactus-content">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contactus-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

// /* Vulnerable code (XSS) */

// import React, { useState } from 'react';

// export default function VulnerableContact() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
//   const [submittedData, setSubmittedData] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Vulnerable: Directly storing and displaying unsanitized user input
//     setSubmittedData(formData);
//     alert('Form submitted (vulnerably)!');
//   };

//   return (
//     <div className="contact-form">
//       <h1>Contact Us (Vulnerable)</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input 
//             type="text" 
//             id="name" 
//             name="name" 
//             value={formData.name}
//             onChange={handleChange}
//             required 
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input 
//             type="email" 
//             id="email" 
//             name="email" 
//             value={formData.email}
//             onChange={handleChange} 
//           />
//         </div>
//         <div>
//           <label htmlFor="message">Message:</label>
//           <textarea 
//             id="message" 
//             name="message" 
//             rows="4" 
//             value={formData.message}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>
//         <button type="submit">Submit</button>
//       </form>

//       {submittedData && (
//         <div className="submitted-data">
//           <h2>Your Submission:</h2>
//           <p>Name: {submittedData.name}</p>
//           <p>Email: {submittedData.email}</p>
//           <div dangerouslySetInnerHTML={{ __html: submittedData.message }} />
//         </div>
//       )}

//       <div className="xss-demo">
//         <h3>Try this XSS payload in the message field:</h3>
//         <code>
//           {'<script>alert("XSS Attack!");</script>'}
//         </code>
//         <p>Or this image-based XSS:</p>
//         <code>
//           {'<img src="x" onerror="alert(\'XSS via image!\')" />'}
//         </code>
//       </div>
//     </div>
//   );
// }
