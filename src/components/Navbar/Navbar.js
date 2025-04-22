import React from 'react';
import { AppBar, Toolbar, IconButton, Button, TextField } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, isAdmin, onLogout }) => {
  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <ShoppingCart />
          <span className="logo-text">upGrad Eshop</span>
        </IconButton>
        
        {isLoggedIn && (
          <TextField
            variant="outlined"
            placeholder="Search products..."
            size="small"
            className="search-bar"
          />
        )}

        <div className="nav-links">
          {!isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/">Home</Button>
              {isAdmin && (
                <Button color="inherit" component={Link} to="/add-product">Add Product</Button>
              )}
              <Button color="inherit" onClick={onLogout}>Logout</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;