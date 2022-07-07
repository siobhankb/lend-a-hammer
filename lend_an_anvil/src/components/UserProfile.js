import React, { useState } from 'react'

export default function UserProfile(props) {

    const [user, setUser] = useState(null);
    let userToken = localStorage.getItem("token");
    if (userToken) {
      let userHeaders = new Headers();
      userHeaders.append("Content-Type", "application/json");
      userHeaders.append("Authorization", `Bearer ${userToken}`);

      fetch("http://127.0.0.1:5000/user-info", {
        method: "GET",
        headers: userHeaders,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            props.flashMessage("unable to retrieve user info", "danger");
          }
        })
        .then((data) => {
          if (data) {
            const user = data;
            localStorage.setItem("current_user", JSON.stringify(user));
            setUser(user)
            console.log('user data= ', user)
          }
        });
    } else {
      console.log('User Profile: no user token stored')
    }
  let currentUser = localStorage.getItem("user");
  setUser(currentUser);

  return (
    <>
      <div className="col-1 justify-end">
        <div className="navbar-nav">
          {user != null ? (
            <h5 className="fw-bold">Welcome, {user.first_name}!</h5>
          ) : (
            <h5 className="fw-bold">Welcome, Handy Person!</h5>
          )}
        </div>
      </div>
    </>
  );
  
    };
  
