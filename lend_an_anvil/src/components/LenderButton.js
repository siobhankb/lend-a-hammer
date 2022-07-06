import React from "react";
import { Link } from "react-router-dom";

export default function LenderButton() {
  return (
    <>
      <form className="form-control">
        <div className="justify-center">
          <label
            htmlFor="becomeLender"
            className="col-form-label align-middle text-center"
          >Ready to Lend Your Tools?</label>
          <div className="col mx-auto">
            <Link
              to="/lender"
              className="btn btn-warning w-50 fw-bold align-middle text-center"
            >
              Lend Tools!
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
