// Home - search for tools & borrow tools
// Login/Register - only if not currently logged in
// Log Out - only if logged in
// My Reservations - only if USER = BORROWER
// My Tools - only if USER = LENDER

import React from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <strong>{props.brand}</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-right">
            {props.loggedIn ? (
            <>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
              <Link className="nav-link" to="/" onClick={props.logUserOut}>
                Logout
              </Link>
            </>
             ) : ( 
            <Link className="nav-link" to="/login">
              Login
            </Link>
             )} 
          </div>
          <div className="navbar-nav">
            {/* {props.isLender ? ( */}
            {/* <>
                <Link className="nav-link" to="/my-tools">
                  My Tools
                </Link>
              </> */}
            {/* ) : null}
            {props.isBorrower ? ( */}
            {/* <>
                <Link className="nav-link" to="/my-reservations">
                  My Reservations
                </Link>
              </> */}
            {/* ) : null} */}
          </div>
        </div>
      </div>
    </nav>
  );
}