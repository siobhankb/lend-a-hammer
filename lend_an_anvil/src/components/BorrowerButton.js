import React from "react";
import { Link } from "react-router-dom";

export default function BorrowerButton(props) {
  return (
    <>
      <div className="card">
        <h4 className="card-title text-center pt-3 my-auto">Looking for a Tool?</h4>
        <div className="card-body text-center mb-3">
          <Link
            to="/borrow"
            className="btn btn-success w-50 fs-4 fw-bold"
            onClick={props.checkBorrower}
          >
            Borrow!
          </Link>
        </div>
      </div>
    </>
  );
}
