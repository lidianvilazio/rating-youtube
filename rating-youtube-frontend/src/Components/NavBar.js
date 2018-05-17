import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {

  return (
    <div className="nav nav-tabs" id="nav-tab" role="tablist">

    {(localStorage.token) ?
      <React.Fragment>
        <NavLink className="nav-item nav-link" to="/videos" exact>Videos</NavLink>
      </React.Fragment>
        :
        <React.Fragment>
          <NavLink className="nav-item nav-link" to="/login" exact>Log In</NavLink>
          <NavLink className="nav-item nav-link" to="/signup" exact>Signup</NavLink>
        </React.Fragment>
      }
    </div>);
};

export default NavBar;
