import React, { useEffect, useState } from "react";
import "./profile.css";
import { Paper, Box, Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from 'axios';
// ...

const Profile1 = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:8080/api/v1/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
          }
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        backgroundImage:
          'url("https://t4.ftcdn.net/jpg/02/94/66/11/240_F_294661109_lmICWxfTmzfQdLZjEmXpGNRzR5BV4k2g.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "150vh",
      }}
    >
      <div className="profilecontent">
        <div className="listt">
          <Box
            className="box1"
            sx={{
              "& > :not(style)": {
                width: 500,
                height: 450,
                backgroundColor: "#00003cba",
              },
            }}
          >
            <Paper elevation={10} className="paperpp">
              <div className="ava">
                <Avatar
                  src="https://www.nicepng.com/png/detail/52-521023_download-free-icon-female-vectors-blank-facebook-profile.png"
                  sx={{
                    width: 60,
                    height: 70,
                    marginTop: "40px",
                    backgroundColor: "#ADD8E6",
                    color: "#000055",
                  }}
                />
              </div>

              <div className="prof">
                <center>
                  <b />
                  <br />
                  <b> User Details</b>
                  <br />
                  <br />
                  Email: {localStorage.getItem('email1')}
                  <br />
                  <br />
                  Role: USER
                  <br />
                  <br />
                  <Link to="/">
                    <Button class="logout-btn">Back To Home</Button>
                  </Link>
                </center>
              </div>
            </Paper>
          </Box>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Profile1;
