// My Tools - 
// only show to logged in LENDERS
// should show a table of tools belonging to LENDER
// should give button option to modify each tool (like modify blog post)
// should have option to ADD tool
import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom';
import ToolRow from './ToolRow'

export default function MyTools(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [lenderID, setLenderID] = useState(0);
  const [myTools, setMyTools] = useState('');
  const [myToolList, setMyToolList] = useState([]);
  const toolHeaders = [
    "Available",
    "Tool Name",
    "Tool Description",
    "Category",
  ];
  if (user) {
  console.log("myTools lenderID =", user.lender.id);
  console.log("myTools tools =", myTools);
  setLenderID(user.lender.id);
  } else {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    setUser(currentUser);
    setLenderID(currentUser.lender.id);
}


  // get lender's tools
  useMemo(() => {
    let isMounted = true;
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
    let baseURL = "http://127.0.0.1:5000/my-tools/lender/";

    fetch(baseURL + lenderID, {
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

  if (myTools) {
    console.log("MyTools tools = ", myTools);
    localStorage.setItem("my_tools", JSON.stringify(myTools));
    getToolList();
  } else {
    let currentUserTools = JSON.parse(localStorage.getItem('my_tools'))
    setMyTools(currentUserTools);
    getToolList();
    console.log("MyTools currentUserTools = ", currentUserTools);
  }

  const getToolList = () => {
    let myToolList = Object.keys(myTools)
    setMyToolList(myToolList)
  }

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
            <ToolRow toolName={t} myTools={myTools} />;
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
