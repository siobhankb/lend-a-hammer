import React from "react";
import { Link } from "react-router-dom";

export default function BorrowerButton() {
  return (
    <>
      <form className="form-control">
        <div className="mx-auto my-auto">
          <label
            htmlFor="becomeBorrower"
            className="form-label"
          >
            <small>Looking for a Tool?</small>
          </label>
          <div className="col">
            <Link
              to="/borrow"
              className="btn btn-success w-50 fw-bold align-middle text-center"
            >
              Borrow!
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
