import React, { useEffect, useState } from "react";
import MyTools from "./MyTools";

export default function GetLender(props) {
  let tokenCheck = localStorage.getItem('token')
  const [userID, setUserID] = useState('')
  const [myTools, setMyTools] = useState('');
  let endURL = props.lenderID;
  console.log("GetLender lenderID = ", endURL);

  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
    console.log(endURL);
    let baseURL = "http://127.0.0.1:5000/my-tools/lender";

    console.log(baseURL + endURL);

    fetch(baseURL + endURL, {
      headers: myHeaders,
    })
      .then((res) => {
        if (res.ok) {
          console.log("GetLender res=ok");
          return res.json();
        } else {
          console.log("GetLender res= NOT ok");
        }
      })
      .then((data) => {
        if (data) {
          let tools = data;
          setMyTools(tools);
        } else {
          console.log("no Get lender tools data");
        }
      })
      .catch((error) => console.log("error", error));
  }, [myTools]);
  console.log("GetLender tools = ", myTools);
  localStorage.setItem('my_tools', myTools)

  return (
    <>
      <h4>This shows LENDER info</h4>
      <h5>lender id: {props.lenderID}</h5>
      <div className="card">
        <h4 className="card-title">My Tools</h4>
        <MyTools
          tools={myTools}
          lenderID={props.lenderID}
          flashMessage={props.flashMessage}
        />
      </div>
    </>
  );
}
