// HOME view:
// borrow button
// lend button
// 

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BorrowerButton from '../components/BorrowerButton';
import GetBorrower from '../components/GetBorrower';
import GetLender from '../components/GetLender';
import LenderButton from '../components/LenderButton';

export default function Home(props) {
  const [userID, setUserID] = useState();
  const [isBorrower, setIsBorrower] = useState();
  const [borrowerID, setBorrowerID] = useState();
  const [borrowerRating, setBorrowerRating] = useState();
  const [isLender, setIsLender] = useState();
  const [lenderID, setLenderID] = useState();
    
  let navigate = useNavigate();  
  
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/user-info", {
      method: 'GET',
      headers: myHeaders
    })
      .then((res) => {
        if (res.ok) {
          console.log("home res = ok");
          let r = res.json();
          console.log(r);
          return r;
          // return res.json();
        } else {
          props.flashMessage("unable to retrieve user info", "danger");
        }
      })
      .then((data) => {
        console.log("data=", data);
        if (data) {
          setUserID(data.id)
          let lender = data.lender;
          console.log("lender=", lender);
          if (lender != {}) {
            const lenderID = lender["lender_id"];
            console.log("lenderID=", lenderID);
            setIsLender(true);
            setLenderID(lenderID);
          } else {
            setIsLender(false);
            setLenderID("null");
          }
          let borrower = data.borrower;
          if (borrower != {}) {
            setIsBorrower(true);
            setBorrowerID(borrower['borrower_id']);
            setBorrowerRating(borrower["borrower_rating"]);
          } else {
            setIsBorrower(false);
            setBorrowerID("null");
          }
        }
      });
  },[]);

  const checkBorrower = () => {
    if (isBorrower == false) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization", `Bearer ${localStorage.getItem('token')}`);
      fetch("http://127.0.0.1:5000/users/borrowers", {
        method: 'POST',
        headers: myHeaders
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            props.flashMessage(data.error, 'danger')
          } else {
            setBorrowerID(data.id)
          }
        })
        .catch((error) => console.log("error", error));
    }
}

  return (
    <>
      <div className="container">
        <div className="row">
          <h2 className="text-center">Home - Lend a Hammer</h2>
          <h4 className="text-center"> user ID: {userID} </h4>
        </div>
        <div className="row">
          <div className="col">
            <LenderButton />
            <GetLender lenderID={lenderID} />
          </div>
          <div className="col">
            <BorrowerButton checkBorrower={checkBorrower} />
            <GetBorrower
              borrowerID={borrowerID}
              borrowerRating={borrowerRating}
            />
          </div>
        </div>
      </div>
    </>
  );
}
