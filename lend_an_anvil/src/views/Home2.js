// HOME view:
// borrow button
// lend button
//

import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import GetBorrower from "../components/GetBorrower";
import GetLender from "../components/GetLender";
import Landing from "./Landing";

export default function Home2(props) {
  const [userToken, setUserToken] = useState("");
  const [user, setUser] = useState();
  const [borrowerID, setBorrowerID] = useState();

    if (props.loggedIn == true) {
        let token = localStorage.getItem("token");
        if (token) {
          setUserToken(token);
          console.log("Home2 userToken= ", token);
          let homeUser = localStorage.getItem("user");
          setUser(homeUser);
          console.log("Home User is: ", user);
        } else {
          console.log("not logged in");
        }
    } else {
        setUser(false)
    }
  
  let userHeaders = new Headers();
  userHeaders.append("Content-Type", "application/json");
  userHeaders.append("Authorization", `Bearer ${userToken}`);

  const checkBorrower = () => {
    if (user.borrower === {}) {
      let isMounted = true;
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${userToken}`);
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
    return props.loggedIn ? (
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
                  <Link
                    to="/lend"
                    className="btn btn-warning w-50 fs-4 fw-bold"
                  >
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
              <Link to="/borrow" className="btn btn-warning w-50 fs-4 fw-bold">
                Borrow Tools
              </Link>
              <GetBorrower user={user} borrowerID={borrowerID} />
            </div>
          </div>
        </div>
      </>
    ) : (
      <Landing flashMessage={props.flashMessage} logUserIn={props.logUserIn} />
    );
    
}
