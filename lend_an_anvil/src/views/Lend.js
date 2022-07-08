// page for becoming a lender:
// set up an exchange location
// button for adding tools --
// -- nested route to appear below buttons w form to add tool
// -- nested (in Lender view) route to appear below add tool form with 
// --       tools added to lender collection

import React, { useState, useMemo, useEffect } from 'react'
import GetLender from '../components/GetLender';
import MyTools from '../components/MyTools';

export default function Lend(props) {
  // find out if current user is already a lender

  // if NOT a lender, 
  // modal: thanks for sharing! please choose an exchange location/you can change it later in your profile

  return (
    <>
      <div className="container">
        <h4 className="mt-3 text-center">Lender Info</h4>
        <div className="row">
          <GetLender
            flashMessage={props.flashMessage}
            userID={localStorage.getItem("user_id")}
          />
        </div>
      </div>
    </>
  );
}
