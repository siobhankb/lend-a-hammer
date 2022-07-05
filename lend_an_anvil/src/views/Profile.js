// User can become Lender
// User can change email/pw
// Displays whether User is Lender, Borrower, or Both

// path="/user:uId/profile"
import { useParams } from "react-router-dom";
import React from 'react'

export default function Profile() {
    let params = useParams();
    let user_id = params['uId']

    return (
      <>
        <div className='container' >
                <h3 className='text-center my-5' >This is a Profile Page</h3>
                <p>for user: {user_id} </p>
        </div>
      </>
    );
}
