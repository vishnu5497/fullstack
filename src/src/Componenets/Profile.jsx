import React, { useEffect, useState } from "react";
import "./profile.css";
import { Paper, Box, Avatar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const nav = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    nav('/');
  };

  const getEmailPrefix = () => {
    const email = localStorage.getItem('email1');
    const atIndex = email.indexOf('@');
    return atIndex !== -1 ? email.slice(0, atIndex).toUpperCase(): email;
  };

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
                    width: 100,
                    height: 100,
                    marginTop: "40px",
                    backgroundColor: "#ADD8E6",
                    color: "#000055",
                  }}
                />
              </div>

              <div className="prof_info">
                <center>
                  <b />
                  <br />
                  Hi User,
                  <br />
                  Glad to Welcome You in!
                  <br />
                  <p style={{ color: "blue" }}>{getEmailPrefix()}</p>
                  <br />
                  <br />
                  <Button class="logout-btn" onClick={handleLogout}>
                    Logout
                  </Button>
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

export default Profile;
