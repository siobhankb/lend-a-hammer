import React, { useState, useEffect } from "react";
import Alert from './components/Alert';
import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Lend from './views/Lend';
import SingleTool from "./views/SingleTool";
import Borrow from './views/Borrow';
import MyReserves from "./components/MyReserves";

function App() {
  const [message, setMessage] = useState(null);
  const [user, setCurrentUser] = useState(null);
    const [category, setCategory] = useState(null);
    const [loggedIn, setLoggedIn] = useState(
      localStorage.getItem("token") ? true : false
    );

    const flashMessage = (message, category) => {
      setMessage(message);
      setCategory(category);
    };

  const logUserIn = () => {
    setLoggedIn(true)
    console.log('from App: setLoggedIn=', loggedIn)
  };
  
    const logUserOut = () => {
    console.log('logUserOut has been called')
    flashMessage("You have successfully logged out", "warning");
    localStorage.removeItem("token");
    localStorage.removeItem('current_user');
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const getCurrentUser = () => {
    if (!user) {
      let userToken = localStorage.getItem("token");
      let userHeaders = new Headers();
      userHeaders.append("Content-Type", "application/json");
      userHeaders.append("Authorization", `Bearer ${userToken}`);

      if (userToken) {
        let isMounted = true;
        // get user from token
        fetch("http://127.0.0.1:5000/user-info", {
          method: "GET",
          headers: userHeaders,
        })
          .then((res) => {
            if (res.ok) {
              console.log("Lend res=ok");
              return res.json();
            } else {
              flashMessage("LEND: unable to retrieve user info", "danger");
            }
          })
          .then((data) => {
            if (data) {
              if (isMounted) {
                let currentUser = data;
                getCurrentUser(currentUser);
                localStorage.setItem("user", JSON.stringify(currentUser));
              }
            }
          });
        return () =>  { isMounted = false }
      }
    } else {
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
}
  return (
    <>
      <Nav
        brand={"Lend-a-Hammer"}
        loggedIn={loggedIn}
        logUserOut={logUserOut}
        flashMessage={flashMessage}
        user={user}
        getCurrentUser={getCurrentUser}
      />
      <div className="container">
        {message ? (
          <Alert
            message={message}
            category={category}
            flashMessage={flashMessage}
          />
        ) : null}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                flashMessage={flashMessage}
                loggedIn={loggedIn}
                user={user}
                getCurrentUser={getCurrentUser}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register flashMessage={flashMessage} logUserIn={logUserIn} />
            }
          />
          <Route
            path="/login"
            element={
              <Login flashMessage={flashMessage} logUserIn={logUserIn} />
            }
          />
          <Route
            path="/borrow"
            element={
              <Borrow
                flashMessage={flashMessage}
                user={user}
                getCurrentUser={getCurrentUser}
              />
            }
          ></Route>
          <Route
            path="/lend"
            element={
              <Lend
                flashMessage={flashMessage}
                user={user}
                getCurrentUser={getCurrentUser}
              />
            }
          ></Route>
          <Route
            path="/modify/<:toolId>"
            element={
              <SingleTool
                flashMessage={flashMessage}
                user={user}
                getCurrentUser={getCurrentUser}
              />
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
