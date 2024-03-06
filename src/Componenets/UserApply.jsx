import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import sharedState from './SharedState';
import './UserApply.css';
import { useNavigate } from 'react-router-dom';

const UserApply = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const [showPopup, setShowPopup] = useState(!isLoggedIn); 
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    // Fields from the first page
    name: '',
    email: '',
    mobile: '',
    branch: '',
    scheme: sharedState.content,
    amount: '',
    purpose: '',
    // Additional fields for the second page
    panCard: '',
    salary: '',
    aadharNo: '',
    address: '',
  });
  const navigate=useNavigate();
  const tot=0;
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      
  
      const response = await axios.post('http://localhost:8080/services', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Set the content type based on your server's requirements
        },
      });
      window.alert("Application Submitted Successfully");
      setFormData({
        name: '',
        email: '',
        mobile: '',
        branch: '',
        scheme: sharedState.content,
        amount: '',
        purpose: '',
        panCard: '',
        salary: '',
        aadharNo: '',
        address: '',
      })
      
      localStorage.setItem('totalreq', tot+1);
  
      console.log('Request:', response.config);
      console.log('Response:', response);
   
  
     
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error submitting application. Please try again.');
    }
  };
  const handlePopupOK = () => {
    setShowPopup(false);
    // Redirect to the login page after clicking OK
    navigate('/login');  // Update '/login' with the actual path to your login page
  };
  


  return (
    <div>
      <NavBar />
   
      <div className="agriculture-loan-container">
        <br/><br/><br/>

        {showPopup && (
          <div className="popup-overlay active">
            <div className="popup active">
              <p>Please log in to submit the application.</p>
              <br/><br/>
              <button type="button" onClick={handlePopupOK} className="button">
                <div className="button-top">OK</div>
                <div className="button-bottom"></div>
                <div className="button-base"></div>
              </button>
            </div>
          </div>
        )}
        <h2>Agriculture Loan - Page {currentPage}</h2>
        <form action="#" method="post" onSubmit={handleSubmit}>
          {currentPage === 1 && (
            <>
              {/* Fields for Page 1 */}
              <div className="form-row">
                <label htmlFor="name">FULL NAME:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <label htmlFor="email">EMAIL:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <label htmlFor="mobile">MOBILE NUMBER:</label>
                <input type="number" id="mobile" name="mobile" pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <label htmlFor="branch">BRANCH NAME: </label>
                <input type="text" id="branch" name="branch" value={formData.branch} onChange={handleChange} required />
              </div>

              <h5 style={{ color: 'red', paddingLeft: '400px' }}>
                *If you apply Loan Under Any scheme Please Specify Below
              </h5>

              <div className="form-row">
                <label htmlFor="scheme">SCHEME NAME: </label>
                <input type="text" id="scheme" name="scheme" value={formData.scheme} onChange={handleChange} />
              </div>

              <div className="form-row">
                <label htmlFor="amount">LOAN AMOUNT:</label>
                <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <label htmlFor="amount">Loan Purpose:</label>
                <input type="text" id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} required />
              </div>
            </>
          )}

          {currentPage === 2 && (
            <>
              {/* Fields for Page 2 */}
              <div className="form-row">
                <label htmlFor="panCard">PAN Card Number:</label>
                <input type="text" id="panCard" name="panCard" value={formData.panCard} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <label htmlFor="salary">Applicant Salary:</label>
                <input type="number" id="salary" name="salary" value={formData.salary} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <label htmlFor="aadharNo">Aadhar Number:</label>
                <input type="number" id="aadharNo" name="aadharNo" value={formData.aadharNo} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <label htmlFor="address">Address:</label>
                <textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>
              <div className="form-row">
      <label htmlFor="documentType">Document Type:</label>
      <select id="documentType" name="documentType" value={formData.documentType} onChange={handleChange} required>
        <option value="" disabled>Select document type</option>
        <option value="pdf">Aadhar</option>
        <option value="doc">PAN card</option>
        <option value="docx">Ration Card</option>
      </select>
    </div>
              <div className="form-row">
                <label htmlFor="document">Attach Document:</label>
                <input type="file" id="document" name="document" accept=".pdf, .doc, .docx" onChange={handleChange} required />
              </div>

              <div className="form-row">
                <label htmlFor="aadharPhoto">Attach Passport Photo:</label>
                <input type="file" id="aadharPhoto" name="aadharPhoto" accept="image/*" onChange={handleChange} required />
              </div>
      
              
            </>
          )}

          {currentPage==1&&(<div className="radio-buttons-container">
            <label>
              <input
                type="radio"
                id="page1"
                name="page"
                value={1}
                checked={currentPage === 1}
                onChange={() => handlePageChange(1)}
              />
              Page 1
            </label>

            <label>
              <input
                type="radio"
                id="page2"
                name="page"
                value={2}
                checked={currentPage === 2}
                onChange={() => handlePageChange(2)}
              />
              Page 2
            </label>
          </div>)}
          {currentPage==2&&(<div><div className="radio-buttons-container">
            <label>
              <input
                type="radio"
                id="page1"
                name="page"
                value={1}
                checked={currentPage === 1}
                onChange={() => handlePageChange(1)}
              />
              Page 1
            </label>

            <label>
              <input
                type="radio"
                id="page2"
                name="page"
                value={2}
                checked={currentPage === 2}
                onChange={() => handlePageChange(2)}
              />
              Page 2
            </label>
           
          </div>
            <br/><br/><br/>
       <div className="sp">   <button type="submit" className="button1">Submit Application</button></div></div> )}

          
        </form>
        {status && <p>{status}</p>}
      </div>
 
    </div>
  );
};

export default UserApply;