import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ToolRow(props) {
    const [available, setAvailable] = useState();

    const handleAvailButton = () => {

        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
        let data = {
            available: !props.myTools.available
        }
        fetch("", {
          method: "PUT",
          headers: myHeaders,
          body: data,
        })
          .then((res) => {
            res.json();
          })
          .then((data) => {
            if (data.error) {
              console.log("Error", data.error);
            } else setAvailable(data.available);
          })
          .catch((error) => console.log("error", error)); 
    };
  console.log('myTools= ', props.myTools);
  console.log("tool_descr= ", props.myTools.tool_descr);

  return (
    // ["Available", "Tool Name", "Tool Description", "Category"]
    <>
      <tr>
        <th>
          {available === true ? (
            <button className="btn btn-success w-50">Available</button>
          ) : (
            <button className="btn btn-secondary w-50">Unavailable</button>
          )}
        </th>
        <td>{props.toolName}</td>
        <td>{props.myTools.tool_descr}</td>
        <td>{props.myTools.category}</td>
        <td>
          <Link
            className="btn btn-primary text-warning fw-bold w-50"
            to={"/"}
            // {`/${tool.id}`}
          >
            More about {props.toolName}
          </Link>
        </td>
      </tr>
    </>
  );
  }
