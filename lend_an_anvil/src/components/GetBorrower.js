import React from 'react'

export default function GetBorrower(props) {

  return (
    <>
      <div className="card">
        <div className="card-header text-center">
          <h4>This shows BORROWER info</h4>
          <h5>borrower id: {props.borrowerID}</h5>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Check Out</th>
                <th scope="col">Tool</th>
                <th scope="col">Lender</th>
                <th scope="col">Date Due</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer text-center">
          <h4>This shows BORROWER rating</h4>
          <h5>borrower rating: {props.borrowerRating}</h5>
        </div>
      </div>
    </>
  );
}
