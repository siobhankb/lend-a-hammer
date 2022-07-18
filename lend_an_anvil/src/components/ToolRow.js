import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ToolRow(props) {
  const [available, setAvailable] = useState(true);
  console.log('available = ', available)

  const myTools = props.myTools
  console.log('ToolRow myTool=', myTools)
  const toolName = props.toolName
  const handleAvailButton = () => {
    // make PUT request to db to change value of myTools[toolName][available] = !myTools[toolName][available]
    setAvailable(!available)
    if (available == true) {
      let btnColor = "success"
    } else {
      let btnColor = "secondary";
    }
  }
        
  console.log('myTools= ', props.myTools);
  console.log("tool_descr= ", props.myTools[toolName]['tool_descr']);

  return (
    // ["Available", "Tool Name", "Tool Description", "Category"]
    <>
      <tr>
        <th>
          {myTools[toolName][available] === true ? (
            <button
              onClick={handleAvailButton}
              className="btn btn-success w-50"
            >
              {" "}
              {/* {`btn btn-${success} w-50`} */}
              Available
            </button>
          ) : null
          // <button
          //     onClick={handleAvailButton}
          //     className="btn bg-secondary bg-opacity-25 w-50 fw-bold"
          //   // className={`btn btn-${unAvailable} bg-opacity-25 w-50`}
          // >
          //   Unavailable
          // </button>
          }
        </th>
        <td id={myTools[toolName]["tool_id"]}>{toolName}</td>
        <td>{myTools[toolName]["tool_descr"]}</td>
        <td>{myTools[toolName]["tool_cat"]}</td>
        <td>
          <Link
            className="btn bg-primary bg-opacity-50 text-dark"
            to={"/modify"}
            myTools={myTools}
            thisTool={myTools[toolName]}
          >
            Modify
          </Link>
        </td>
      </tr>
    </>
  );
  }
