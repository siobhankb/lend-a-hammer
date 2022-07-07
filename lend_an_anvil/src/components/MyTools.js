// My Tools - 
// only show to logged in LENDERS
// should show a table of tools belonging to LENDER
// should give button option to modify each tool (like modify blog post)
// should have option to ADD tool
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ToolRow from './ToolRow'

export default function MyTools(props) {
  const toolHeaders = ["Available", "Tool Name", "Tool Description", "Category"];
  let lenderID = props.lenderID
  console.log("myTools lenderID =", props.lenderID);
  console.log('myTools tools =', props.tools);
  let myToolList = Object.keys(props.tools)
  console.log('myToolList = ', myToolList)

  return (
    <>
      <table className="table table-warning table-striped table-hover text-center">
        <thead>
          <tr>
            {toolHeaders.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {myToolList.map((t) => {
            <ToolRow toolName={t} myTools={props.tools} />;
          })}
        </tbody>
      </table>
      {/* <div className="card mb-3">
        <div className="card-header text-center fs-3">
          Displays Lender's Tools:
        </div>
        <div className="card-body">
          <h5 className="card-title">My Tools</h5>
          <p className="card-text">
            This will be a table of the tools owned by LENDER
          </p>
          will change this to edit or something like that
          <div>
            <Link to="/lend" className="btn btn-warning fs-6 fw-bold">
              Lend Tools!
            </Link>
          </div>
        </div>
        <div className="card-footer">
          <h5 className="card-text fs-5">Lender Rating</h5>
        </div>
      </div> */}
    </>
  );
}
