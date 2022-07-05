import React, { useState, useEffect } from "react";
import Alert from './components/Alert';
import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav';
import Nav2 from './components/Nav2'
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Lend from './views/Lend';
import MyTools from "./views/MyTools";
import Borrow from './views/Borrow';
import MyReserves from "./views/MyReserves";
import Profile from "./views/Profile";

function App() {
    const [message, setMessage] = useState(null);
    const [category, setCategory] = useState(null);
    const [loggedIn, setLoggedIn] = useState(
      localStorage.getItem("token") ? true : false
    );
  let t = localStorage.getItem("token")
  console.log('from App top of function:', t);

  const [isBorrower, setIsBorrower] = useState(true);
  const [isLender, setIsLender] = useState(false);

    const flashMessage = (message, category) => {
      setMessage(message);
      setCategory(category);
    };

  const logUserIn = () => {
    console.log('from App: logUserIn-->')
    setLoggedIn(true)
    console.log('from App: setLoggedIn=', loggedIn)
  };

  const logUserOut = () => {
      console.log('logUserOut=', loggedIn)
      flashMessage("You have successfully logged out", "warning");
      localStorage.removeItem("token");
      console.log('logUserOut & remove token=', localStorage.getItem('token'))
      setLoggedIn(false);
    };
  
  // const getUser = useEffect(() => {
  //   fetch("http://127.0.0.1:5000/users");
  // }); 

  return (
    <>
      <Nav
        brand={"Lend-a-Hammer"}
        loggedIn={loggedIn}
        logUserOut={logUserOut}
      />
      {/* <Nav2
        brand={"Lend-a-Hammer"}
        loggedIn={loggedIn}
        logUserOut={logUserOut}
      /> */}
      <div className="container">
        {message ? (
          <Alert
            message={message}
            category={category}
            flashMessage={flashMessage}
          />
        ) : null}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={<Register flashMessage={flashMessage} logUserIn={logUserIn} />}
          />
          <Route
            path="/login"
            element={
              <Login flashMessage={flashMessage} logUserIn={logUserIn} />
            }
          />
          {/* <Route
            path="/borrow"
            element={<Borrow flashMessage={flashMessage} loggedIn={loggedIn} />}
          >
            <Route
              path="/borrower:bId/my-reservations"
              element={
                <MyReserves flashMessage={flashMessage} loggedIn={loggedIn} />
              }
            />
          </Route> */}
          {/* <Route path="/borrow" element={<Borrow />}></Route>
          <Route path="/lend" element={<Lend />}></Route> */}
          {/* <Route
            path="/lend"
            element={<Lend flashMessage={flashMessage} loggedIn={loggedIn} />}
          >
            <Route
              path="/lender:lId/my-tools"
              element={
                <MyTools flashMessage={flashMessage} loggedIn={loggedIn} />
              }
            />
          </Route> */}
          <Route
            path="/user:uId/profile"
            element={
              <Profile flashMessage={flashMessage} loggedIn={loggedIn} />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
