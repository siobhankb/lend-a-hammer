import React from 'react'

export default function GetBorrower(props) {

  return (
    <>
      <div className="card">
        <div className="card-header text-center">
          <h4>This shows BORROWER info</h4>
          <h5> (...under construction...) </h5>
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
                <th scope="row">05/09/22</th>
                <td>a tool</td>
                <td>Rizzo diRat</td>
                <td>07/08/22</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer text-center">
          <h4>This shows BORROWER rating</h4>
          <h5>borrower rating: 5.0 </h5>
        </div>
      </div>
    </>
  );
}
