import React from "react";
import { Link } from "react-router-dom";

export default function LenderButton() {
  return (
    <>
      <div className="card">
        <h4 className="card-title text-center pt-3 my-auto">
          Ready to Lend Your Tools?
        </h4>
        <div className="card-body text-center mb-3">
          <Link to="/borrow" className="btn btn-warning w-50 fs-4 fw-bold">
            Lend Tools!
          </Link>
        </div>
      </div>
    </>
  );
}
