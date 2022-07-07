// page for becoming a lender:
// set up an exchange location
// button for adding tools --
// -- nested route to appear below buttons w form to add tool
// -- nested (in Lender view) route to appear below add tool form with 
// --       tools added to lender collection

import React, { useState, SetStateAction, useEffect } from 'react'
import AddToolForm from '../components/AddToolForm';
import GetLender from '../components/GetLender';
import MyTools from '../components/MyTools';
import NewToolForm from '../components/NewToolForm';

export default function Lend(props) {
  const [user, setUser] = useState();
  const [userID, setUserID] = useState();
  const [isBorrower, setIsBorrower] = useState();
  const [borrowerID, setBorrowerID] = useState();
  const [borrowerRating, setBorrowerRating] = useState();
  const [isLender, setIsLender] = useState();
  const [lenderID, setLenderID] = useState();
  const [addMode, setAddMode] = useState(false);

  let userHeaders = new Headers();
  userHeaders.append("Content-Type", "application/json");
  userHeaders.append(
    "Authorization",
    `Bearer ${localStorage.getItem("token")}`
  );

  // get user from token
  useEffect(() => {
    fetch("http://127.0.0.1:5000/user-info", {
      method: "GET",
      headers: userHeaders,
    })
      .then((res) => {
        if (res.ok) {
          console.log("Lend res=ok");
          return res.json();
        } else {
          props.flashMessage("LEND: unable to retrieve user info", "danger");
        }
      })
      .then((data) => {
        if (data) {
          setUser(data);
          setUserID(data.id);
          let lender = data.lender;
          console.log("Lend lender=", lender);
          if (lender !== {}) {
            const lID = lender.id;
            console.log("Lend lenderID=", lID);
            setIsLender(true);
            setLenderID(lID);
          } else {
            setIsLender(false);
            setLenderID("null");
          }
        }
      });
  }, []);

  return (
    <>
      <div className="container">
        <h4 className="text-center">This is a lender page</h4>
        <GetLender
          user={props.user}
          lenderID={props.lenderID}
          flashMessage={props.flashMessage}
        />
        {/* <MyTools user={props.user} lenderID={props.lenderID} /> */}
        <AddToolForm user={props.user} lenderID={props.lenderID} />
        {addMode ? (
          <AddToolForm user={props.user} lenderID={props.lenderID} />
        ) : null}
      </div>
    </>
  );
}
