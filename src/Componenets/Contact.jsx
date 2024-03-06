import React, { useState } from 'react';
import axios from 'axios';
import './cont.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Replace with your authentication logic
      const response = await axios.post(
        'http://localhost:8080/contacts/post',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response);

      // Handle success or navigate to another page
    } catch (error) {
      console.error('Error:', error);

      // Handle error, show an alert, etc.
    }
  };

  return (
    <div className="form-main">
      <div className="main-wrapper">
        <h2 className="form-head">Contact Form</h2>
        <form className="form-wrapper" onSubmit={handleSubmit}>
          <div className="form-card">
            <input
              className="form-input"
              type="text"
              name="name"
              
              required
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="name">
              Full Name
            </label>
          </div>

          <div className="form-card">
            <input
              className="form-input"
              type="email"
              name="email"
             
              required
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="email">
              Email
            </label>
          </div>

          <div className="form-card">
            <input
              className="form-input"
              type="text"
              name="subject"
              
              required
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="subject">
              Query/Complaint
            </label>
          </div>

          <div className="form-card">
            <textarea
              className="form-textarea"
              maxLength="420"
              rows="3"
              name="message"
              
              required
              onChange={handleChange}
            ></textarea>
            <label className="form-textarea-label" htmlFor="message">
              Address
            </label>
          </div>

          <div className="btn-wrap">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
