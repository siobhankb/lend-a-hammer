// My Tools - 
// only show to logged in LENDERS
// should show a table of tools belonging to LENDER
// should give button option to modify each tool (like modify blog post)
// should have option to ADD tool
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ToolRow from "./ToolRow";

export default function MyTools(props) {
  const [user, setUser] = useState("");
  const [lenderID, setLenderID] = useState();
  const [myTools, setMyTools] = useState("");
  const [myToolList, setMyToolList] = useState([]);
  const toolHeaders = [
    "Available",
    "Tool Name",
    "Tool Description",
    "Category",
    "",
  ];

  // get lender's tools
  useMemo(() => {
    let isMounted = true;
    let currentUser = JSON.parse(localStorage.getItem("user"));
    let currUserID = currentUser.lender.id;
    console.log("currentUser in MyTools=", currentUser);
    console.log("MyTools lID= ", currUserID);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
    let baseURL = "http://127.0.0.1:5000/my-tools/lender/";
    let lID = currentUser.lender.id;
    setLenderID(String(lID));
    console.log("before fetch lenderID= ", String(lID));
    console.log("url concat= ", baseURL + String(lID));

    fetch(baseURL + String(lID), {
      methods: "GET",
      headers: myHeaders,
    })
      .then((res) => {
        if (res.ok) {
          console.log("MyTools fetch: res=ok");
          return res.json();
        } else {
          console.log("MyTools fetch: res= NOT ok");
        }
      })
      .then((data) => {
        if (data) {
          if (isMounted) {
            let tools = data;
            setMyTools(tools);
            console.log("myTools from fetch= ", tools);
            let toolList = Object.keys(tools);
            setMyToolList(toolList);
            console.log("myToolList= ", toolList);
          }
        } else {
          console.log("no data from -MyTools-");
        }
      })
      .catch((error) => console.log("error", error));

    return () => {
      isMounted = false;
    };
  }, []);

  // if (myTools) {
  //   console.log("MyTools tools = ", myTools);
  //   localStorage.setItem("my_tools", JSON.stringify(myTools));
  //   getToolList();
  // } else {
  //   let currentUserTools = localStorage.getItem("my_tools");
  //   setMyTools(currentUserTools);
  //   getToolList(currentUserTools);
  //   console.log("MyTools currentUserTools = ", currentUserTools);
  // }

  // if (user) {
  //   console.log("myTools lenderID =", user.lender.id);
  //   console.log("myTools tools =", myTools);
  //   setLenderID(user.lender.id);
  // } else {
  //   let currentUser = localStorage.getItem("user");
  //   setUser(currentUser);
  //   setLenderID(currentUser.lender.id);
  //   console.log("setUser --> ", currentUser);
  // }

  return (
    <>
      <table className="table">
        <thead className="table-warning text-center">
          <tr>
            {toolHeaders.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody></tbody>
        {/* {this.state.racers.map((racer, idx) => (
          <RacerRow racer={racer} key={idx} />
        ))} */}
        {myToolList.map((tool, index) => (
          <ToolRow
            key={index}
            toolName={tool}
            myTools={myTools}
            flashMessage={props.flashMessage}
          />
        ))}
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
