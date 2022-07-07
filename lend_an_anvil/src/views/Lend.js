// page for becoming a lender:
// set up an exchange location
// button for adding tools --
// -- nested route to appear below buttons w form to add tool
// -- nested (in Lender view) route to appear below add tool form with 
// --       tools added to lender collection

import React from 'react'
import AddToolForm from '../components/AddToolForm';
import MyTools from '../components/MyTools';
import NewToolForm from '../components/NewToolForm';

export default function Lend(props) {
  return (
    <>
      <div className="container">
        <h4 className="text-center">This is a lender page</h4>
        {/* <MyTools /> */}
        <AddToolForm user={props.user} lenderID={props.lenderID} />
      </div>
    </>
  );
}
