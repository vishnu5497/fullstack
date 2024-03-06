import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './cot.css'
const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('token'); // Replace 'yourAuthToken' with the actual key for your token
        const response = await axios.get('http://localhost:8080/contacts/get-all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []); // Empty dependency array to execute once on component mount

  return (<div className="boo">
     <Link to="/adminHome"><button className="back-button">BACK</button></Link>
    <div className="container">
      <br/><br/>
      <h2 className="title">Contact List</h2>
      <br/><br/>
      <ul className="contact-list">
        {contacts.map((contact) => (
          <li className="contact-item" key={contact.id}>
            <strong className="contact-label">Name:</strong> {contact.name}<br />
            <strong className="contact-label">Email:</strong> {contact.email}<br />
            <strong className="contact-label">Subject:</strong> {contact.subject}<br />
            <strong className="contact-label">Message:</strong> {contact.message}
          </li>
        ))}
      </ul>
    </div></div>
  );
};

export default ContactList;
