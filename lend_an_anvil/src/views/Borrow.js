// search feature to look for a tool to borrow
// button by each tool listing - BORROW!
// form to choose date of check-out and return
import React from 'react'
import GetBorrower from '../components/GetBorrower'

export default function Borrow(props) {
  return (
      <>
      <div className="container">
        <h4 className="mt-3 text-center">Borrower Info</h4>
        <div className="row">
          <GetBorrower flashMessage={props.flashMessage} userID={localStorage.getItem('user_id')}
          />
        </div>
      </div>
    </>
  )
}
