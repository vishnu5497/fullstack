import React from 'react';
import './footer.css';
const Footer = () => {
  return (
    <footer className="foot_sec">
      <div className="foot_top">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="foot_left">
                <img src="https://ibb.co/1GTcwmk/logo.png" alt="" />
                <p>
                AgroFinance App is revolutionizing the way 
                farmers access financial support for their agricultural 
                endeavors. Our platform has been tailored to meet the unique needs of the farming community, providing a seamless and efficient solution for obtaining agricultural loans.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="foot_rt">
                <h3>CONTACTS</h3>
                <p>
                  <span>Address: </span>
                  West Littleton Boulevard Littleton, Colorado 80187
                </p>
                <p>
                  <span>Phone: </span>
                  <a href="tel:#">(123) 731-4000</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="foot_btm">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>
                <a href="#"> Window King</a> © 2023. Allright Reserved.
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
