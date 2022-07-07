import React from "react";

export default function Alert(props) {
  const category = props.category
  return (
    <>
      <div
        className={`alert alert-${props.category} alert-dismissible fade show role='alert'`}
      >
        <strong>{props.message}</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </>
  );
}
