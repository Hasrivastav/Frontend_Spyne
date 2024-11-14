import React, { useState, useEffect, useRef } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import zIndex from "@mui/material/styles/zIndex";
import { BASE_URL } from "../BASE_URL";
import { height } from "@mui/system";
import toast from "react-hot-toast";

const headerStyles = {
  position: "sticky",  
  top: "0",           
  zIndex: "1000",      
  display: "flex",
  height: "60px",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px 16px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};


const logoStyles = {
  display: "flex",
  alignItems: "center",
};

const titleStyles = {
  marginLeft: "8px",
  fontSize: "24px",
  color: "#333",
};

const popoverStyles = {
  position: "absolute",
  top: "50px",
  right: "16px",
  zIndex: "1000",
  padding: "16px",
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  display: "none",
  flexDirection: "column",
  alignItems: "center",
  width: "200px",
};

const popoverVisible = {
  display: "flex",
};

const avatarStyles = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "#ccc",
  marginBottom: "8px",
};

const buttonStyles = {
  padding: "8px 16px",
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const closeIconStyles = {
  position: "absolute",
  top: "8px",
  right: "8px",
  cursor: "pointer",
};

const user = {
  name:"" ,
  email:""
};

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoggedIn, logout } = useAuth();
  const popoverRef = useRef(null);

  const navigate = useNavigate();

  const handleIconClick = (event) => {
    user.name = sessionStorage.getItem('name')
    user.email = sessionStorage.getItem('email')
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");

      if (!token) {
       
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      logout();
      toast.success('Logged out successfully')
      handlePopoverClose();
      navigate("/login");

    } catch (error) {
      toast.error(
        "Error logging out:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !anchorEl.contains(event.target)
      ) {
        handlePopoverClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorEl]);


  return (
    <header style={headerStyles}>
      <div style={logoStyles}>
        <img src="https://www.spyne.ai/_next/image?url=https%3A%2F%2Fmedia.spyneai.com%2Funsafe%2Ffilters%3Aformat(webp)%2Fd20uiuzezo3er4.cloudfront.net%2FAI-tools%2Fai-tool-home%2FHeaderNew%2FSpyne%2BLogo%2Bblack.png&w=640&q=75" alt="logo" className="logo-image" />
      
      </div>

      {isLoggedIn && (
        <AccountCircleIcon
          fontSize="inherit"
          sx={{
            width: "40px",
            height: "40px",
            cursor: "pointer",
            color: "#black",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
          onClick={handleIconClick}
        />
      )}

     
      <div
        ref={popoverRef}
        style={{ ...popoverStyles, ...(open ? popoverVisible : {}) }}
      >
       
        <CloseIcon style={closeIconStyles} onClick={handlePopoverClose} />

        <div style={avatarStyles}></div>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <button style={buttonStyles} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
