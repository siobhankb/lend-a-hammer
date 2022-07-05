// basic sign-up/register user page

import React, { useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";

export default function Register(props) {
  const [toRedirect, setToRedirect] = useState(null);

let navigate = useNavigate();

const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log(e);

  // Confirm that passwords are equal
  let password = e.target.password.value;
  let confirmPass = e.target.confirmPass.value;
  console.log(password, confirmPass);
  if (password !== confirmPass) {
    props.flashMessage("Your passwords do not match", "danger");
  } else {
    // Set up post request to /auth/users
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let data = JSON.stringify({
      first_name: e.target.fname.value,
      last_name: e.target.lname.value,
      zip_code: e.target.zip.value,
      email: e.target.email.value,
      password: password,
    });
    console.log('form data=', data)

    fetch("http://127.0.0.1:5000/users", {
      method: "POST",
      headers: myHeaders,
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          props.flashMessage(data.error, "danger");
        } else {
          props.flashMessage(`${data.username} has been registered`, "success");
          setToRedirect(true);
          props.logUserIn();
        }
      });
  }
};

  return toRedirect ? (
    <Navigate to="/" />
  ) : (
    <>
      <div className="row">
        <div className="col col-md-6 mx-auto">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input
                className="form-control form-control-lg fw-bold text-center border-0 mt-5"
                type="text"
                value="Register to Lend or Borrow Tools"
                readonly
              ></input>
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                name="fname"
                className="form-control"
                placeholder="First"
              />
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                name="lname"
                className="form-control"
                placeholder="Last"
              />
              <label htmlFor="zip">Zip Code</label>
              <input
                type="text"
                name="zip"
                className="form-control"
                placeholder="5-Digit Zip Code"
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="name@mail.com"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
              />
              <label htmlFor="confirmPass">Confirm Password</label>
              <input
                type="password"
                name="confirmPass"
                className="form-control"
                placeholder="Confirm Password"
              />
              <div className="row">
                <div className="col col-md-4 mx-auto">
                  <input
                    type="submit"
                    className="btn btn-primary mt-3"
                    value="Register"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
