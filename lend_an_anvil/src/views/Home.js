// HOME view:
// borrow button
// lend button
//

import React, { useEffect, useState, useMemo } from "react";
import { Link } from 'react-router-dom'
import BorrowerButton from "../components/BorrowerButton";
import GetBorrower from "../components/GetBorrower";
import GetLender from "../components/GetLender";
import Login from "./Login";

export default function Home(props) {
  const [userToken, setUserToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState();
  const [borrowerID, setBorrowerID] = useState();

  console.log('Home Page userToken= ', userToken)
  let userHeaders = new Headers();
  userHeaders.append("Content-Type", "application/json");
  userHeaders.append(
    "Authorization",
    `Bearer ${userToken}`
  );

  useMemo(() => {
    let isMounted = true;
    console.log("Home: I'm inside the Memo!")
    fetch("http://127.0.0.1:5000/user-info", {
      method: "GET",
      headers: userHeaders,
    })
      .then((res) => {
        if (res.ok) {
          console.log("Home res=ok");
          return res.json();
        } else {
          props.flashMessage("HOME: unable to retrieve user info", "danger");
        }
      })
      .then((data) => {
        if (data) {
          if (isMounted) {
            let userInfo = data;
            setUser(userInfo);
            console.log("fetched userInfo= ", userInfo);
          }
        }
      });
    return () => { isMounted = false }
  }, []);

  const checkBorrower = () => {
    if (user.borrower === {}) {
      let isMounted = true;
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
      fetch("http://127.0.0.1:5000/users/borrowers", {
        method: "POST",
        headers: myHeaders,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            props.flashMessage(data.error, "danger");
          } else {
            if (isMounted) {
              setBorrowerID(data.id);
            }
          }
        })
        .catch((error) => console.log("error", error));
      return () => {
        isMounted = false;
      };
    }
  };

  if (user) {
    console.log("user= ", user);
  } else {
    console.log('no user yet');
  }
  
  return user ? (
    <>
      <div className="container">
        <div className="row">
          <h2 className="text-center">Home - Lend a Hammer</h2>
          <h4 className="text-center"> user ID: {user.id} </h4>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <h4 className="card-title text-center pt-3 my-auto">
                Ready to Lend Your Tools?
              </h4>
              <div className="card-body text-center mb-3">
                <Link to="/lend" className="btn btn-warning w-50 fs-4 fw-bold">
                  Lend Tools!
                </Link>
              </div>
            </div>
            {/* <GetLender
              user={user}
              lenderID={user.lender.id}
              flashMessage={props.flashMessage}
            /> */}
            {/* {userlender !=={} ? (
              <>
                <GetLender
                  user={user}
                  lenderID={user.lender.id}
                  flashMessage={props.flashMessage}
                />
              </>
            ) : (
              <LenderButton />
            )} */}
          </div>
          <div className="col">
            <BorrowerButton checkBorrower={checkBorrower} />
            <GetBorrower user={user} borrowerID={borrowerID} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <Login flashMessage={props.flashMessage} logUserIn={props.logUserIn} />
  );
}