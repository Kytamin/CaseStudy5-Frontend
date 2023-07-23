import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import "./navbar.css";
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import LoginModal from "../modal/modal"
import { useDispatch, useSelector } from "react-redux";
import { Dashboard } from '@mui/icons-material';



export default function NavbarMainPage() {
  const user = useSelector(state => state.auth.userLogin)

  

  return (
    
    <><Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" id="navbar">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          COMICS
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
        <p>{user.email}</p>
       </Toolbar>
    </AppBar>
    </Box>
  <Dashboard/></>
  );
}