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
  // get user from token
  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
  })

  return (
    <>
      <div className="container">
        <h4 className="text-center">This is a lender page</h4>
        {/* <GetLender
          user={props.user}
          lenderID={props.lenderID}
          flashMessage={props.flashMessage}
        /> */}
        {/* <MyTools user={props.user} lenderID={props.lenderID} /> */}
        <AddToolForm user={props.user} lenderID={props.lenderID} />
      </div>
    </>
  );
}
