import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const [loggedIn, setLoggedIn] = useState();
  
  const isBorrower= useEffect(() => {
    if (loggedIn) {
      return ''
    }
  })

  return (
    <div className="container">
      <h2>Lend A Hammer!</h2>
    </div>
  );
}

export default App;
