import React, { useState, useEffect } from "react";
import Alert from './components/Alert';
import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Lend from './views/Lend';
import MyTools from "./components/MyTools";
import Borrow from './views/Borrow';
import MyReserves from "./components/MyReserves";

function App() {
    const [message, setMessage] = useState(null);
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
    setLoggedIn(false);
  };

  return (
    <>
      <Nav
        brand={"Lend-a-Hammer"}
        loggedIn={loggedIn}
        logUserOut={logUserOut}
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
            element={<Borrow flashMessage={flashMessage} />}
          >
          </Route>
          <Route path="/lend" element={<Lend flashMessage={flashMessage} />}>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
