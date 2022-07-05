import React from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
return (
  <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.brand}
        </Link>
        <button
          className="navbar-toggler ms-right navbar-light"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-right">
            {/* {props.loggedIn ? ( */}
              <>
                {/* <h2 className='text-danger' >you are logged in</h2> */}
                {/* <Link className="nav-link active" aria-current="page" to="/">
                  Profile
                </Link> */}
                <Link className="nav-link" to="/" onClick={props.logUserOut()} >
                  Logout
                </Link>
              </>
            {/* ) : ( */}
              <>
                <Link className="nav-link active" aria-current="page" to="/login">
                  Login
                </Link>
              </>
            {/* )} */}
          </div>
        </div>
      </div>
    </nav>
  </>
);
}
