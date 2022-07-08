import React, { useEffect, useMemo, useState } from "react";
import MyTools from "./MyTools";
import AddToolForm from "./AddToolForm";

export default function GetLender(props) {
  //props = user, lenderID, flashMessage
  const [user, setUser] = useState(props.user);
  const [lenderID, setLenderID] = useState(props.lenderID);
  const [addMode, setAddMode] = useState(false);
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));


  useMemo(() => {
    let isMounted = true;
    console.log("Get Lender: I'm inside the Memo!");

    console.log("Get Lender Component userToken= ", userToken);
    let userHeaders = new Headers();
    userHeaders.append("Content-Type", "application/json");
    userHeaders.append("Authorization", `Bearer ${userToken}`);

    fetch("http://127.0.0.1:5000/user-info", {
      method: "GET",
      headers: userHeaders,
    })
      .then((res) => {
        if (res.ok) {
          console.log("Lend user-info res=ok");
          return res.json();
        } else {
          props.flashMessage("LEND: unable to retrieve user info", "danger");
        }
      })
      .then((data) => {
        if (data) {
          if (isMounted) {
            let userInfo = data;
            setUser(userInfo);
            localStorage.setItem('user', JSON.stringify(userInfo))
            console.log("Lend: fetched userInfo= ", userInfo);
            console.log("user= ", userInfo);
            console.log("user.lender= ", userInfo.lender);
            console.log("user.lender.id= ", userInfo.lender.id);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (user) {
    console.log("user= ", user);
    console.log("user.lender= ", user.lender);
    console.log("user.lender.id= ", user.lender.id);
  }
  
  const changeAddMode = (e) => {
    e.preventDefault();
    setAddMode(!addMode)
  }
    
  console.log('addMode= ', addMode)
  return (
    <>
      <div className="card col-8 mx-auto">
        <h4>This shows LENDER info</h4>
        <h5>lender id: {lenderID}</h5>
        <h4 className="card-title text-center">My Tools</h4>
        <div className="card-body text-center">
          <MyTools
            user={user}
            lenderID={lenderID}
            flashMessage={props.flashMessage}
          />
          {addMode == true ? (
            <>
              {/* <h6>addMode= {addMode}</h6> */}
              <AddToolForm flashMessage={props.flashMessage} />
              {/* <AddToolForm user={user} lenderID={user.lender.id} /> */}
              <button
                onClick={changeAddMode}
                className="btn btn-secondary text-center mt-3"
              >
                Finished Adding Tools
              </button>
            </>
          ) : (
            <>
              <h6>addMode= {addMode}</h6>
              <button onClick={changeAddMode} className="btn btn-success">
                Add More Tools!
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
