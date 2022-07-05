// basic log-in page

import React, { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom';

export default function Login(props) {

  const [toRedirect, setToRedirect] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    let email = e.target.email.value;
    let password = e.target.password.value;
    let encodedUserPass = btoa(`${email}:${password}`);

    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Basic ${encodedUserPass}`);
    console.log('myHeaders=', myHeaders);

    fetch("http://127.0.0.1:5000/token", {
      method: "POST",
      headers: myHeaders,
    })
      .then((res) => {
        if (res.ok) {
          console.log('res=ok')
          let r = res.json();
          console.log(r)
          return r;
          // return res.json();
        } else {
          props.flashMessage("Incorrect email/password", "danger");
        }
      })
      .then((data) => {
        console.log('data=', data);
        if (data) {
          // console.log('if data... proceeding')
          // console.log("data.token=", data.token);
          localStorage.setItem("token", data.token);
          // let t = localStorage.getItem('token')
          // console.log('localStorage set/get =', t)
          props.flashMessage("You have successfully logged in", "success");
          // console.log('should log in user now...')
          props.logUserIn();
          setToRedirect(true);
        }
      });
  }

  console.log("outside scope of fetch -->");
  let aToken = localStorage.getItem("token");
  console.log('localStorage.getItem("token")=', aToken);

  return toRedirect ? (
    <Navigate to="/" />
  ) : (
    <>
      <h4 className="text-center my-5">Log in to Lend a Hammer</h4>
      <div className="row">
        <div className="col col-lg-5 mx-auto">
          <form onSubmit={handleFormSubmit}>
            <div className="from-group">
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
              <div className="row">
                <div className="col col-lg-4 mx-auto">
                  <input
                    type="submit"
                    className="btn btn-primary mt-3"
                    value="Login"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  for="registerHoriz"
                  className="col-4 col-form-label fs-6 align-middle text-end"
                >
                  <small>No Account Yet?</small>
                </label>
                <div className="col-7">
                  <Link
                    className="form-control fw-bold fs-6 text-center align-middle border-0"
                      id="registerHoriz"
                      to='/register'
                  ></Link>
                  <input
                    type="button"
                    className="form-control fw-bold fs-6 text-center align-middle border-0"
                    id="registerHoriz"
                    value="Register to Lend or Borrow Tools"
                    readonly
                  />
                </div>
                {/* <div className="row">
                  <div className="col mx-auto">
                    <label className="text-center" htmlFor="register">
                      No account yet?
                    </label>
                    <input
                      className="form-control fw-bold text-center border-0"
                      type="text"
                      name="register"
                      value="Register to Lend or Borrow Tools"
                      readonly
                    ></input>
                  </div>
                </div> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
