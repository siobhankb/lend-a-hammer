// HOME view:
// borrow button
// lend button
//

import React, { useEffect, useState } from "react";
import BorrowerButton from "../components/BorrowerButton";
import GetBorrower from "../components/GetBorrower";
import GetLender from "../components/GetLender";
import LenderButton from "../components/LenderButton";

export default function Home(props) {
  const [user, setUser] = useState();
  const [userID, setUserID] = useState();
  const [isBorrower, setIsBorrower] = useState();
  const [borrowerID, setBorrowerID] = useState();
  const [borrowerRating, setBorrowerRating] = useState();
  const [isLender, setIsLender] = useState();
  const [lenderID, setLenderID] = useState();

  let userHeaders = new Headers();
  userHeaders.append("Content-Type", "application/json");
  userHeaders.append(
    "Authorization",
    `Bearer ${localStorage.getItem("token")}`
  );

  useEffect(() => {
    fetch("http://127.0.0.1:5000/user-info", {
      method: "GET",
      headers: userHeaders,
    })
      .then((res) => {
        if (res.ok) {
          console.log('Home res=ok')
          return res.json();
        } else {
          props.flashMessage("HOME: unable to retrieve user info", "danger");
        }
      })
      .then((data) => {
        if (data) {
          setUser(data);
          setUserID(data.id);
          let lender = data.lender;
          console.log("Home lender=", lender);
          if (lender !== {}) {
            const lenderID = lender.id;
            console.log("Home lenderID=", lenderID);
            setIsLender(true);
            setLenderID(lenderID);
          } else {
            setIsLender(false);
            setLenderID("null");
          }
          let borrower = data.borrower;
          if (borrower !== {}) {
            const borrowID = borrower.borrower_id;
            console.log('Home borrowerID = ', borrowID)
            setIsBorrower(true);
            setBorrowerID(borrowID);
            setBorrowerRating(borrower["borrower_rating"]);
          } else {
            setIsBorrower(false);
            setBorrowerID("null");
          }
        }
      });
  }, []);

  const checkBorrower = () => {
    if (isBorrower === false) {
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
            setBorrowerID(data.id);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <h2 className="text-center">Home - Lend a Hammer</h2>
          <h4 className="text-center"> user ID: {userID} </h4>
        </div>
        <div className="row">
          <div className="col">
            <LenderButton user={user} lenderID={lenderID} />
            <GetLender
              user={user}
              lenderID={lenderID}
              isLender={isLender}
              flashMessage={props.flashMessage}
            />
            {/* {lenderID ? (
              <>
                <GetLender
                  user={user}
                  lenderID={lenderID}
                  isLender={isLender}
                  flashMessage={props.flashMessage}
                />
              </>
            ) : (
              <LenderButton />
            )} */}
          </div>
          <div className="col">
            <BorrowerButton checkBorrower={checkBorrower} />
            <GetBorrower
              user={user}
              borrowerID={borrowerID}
              borrowerRating={borrowerRating}
            />
          </div>
        </div>
      </div>
    </>
  );
}