import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ToolRow(props) {
  const [available, setAvailable] = useState();
  const myTools = props.myTools
  console.log('ToolRow myTool=', myTools)
  const toolName = props.toolName
  const handleAvailButton = () => {
    // make PUT request to db to change value of myTools[toolName][available] = !myTools[toolName][available]
  }
        
  console.log('myTools= ', props.myTools);
  console.log("tool_descr= ", props.myTools[toolName]['tool_descr']);

  return (
    // ["Available", "Tool Name", "Tool Description", "Category"]
    <>
      <tr>
        <th>
          {myTools[toolName][available] === true ? (
            <button onClick={handleAvailButton} className="btn btn-success w-50">Available</button>
          ) : (
            <button onClick={handleAvailButton} className="btn btn-secondary w-50">Unavailable</button>
          )}
        </th>
        <td id={myTools[toolName]['id']} >{toolName}</td>
        <td>{myTools[toolName]['tool_descr']}</td>
        <td>{myTools[toolName]['category']}</td>
        <td>
          <Link
            className="btn btn-primary text-warning fw-bold w-50"
            to={"/"}
            // {`/${tool.id}`}
          >
            Modify {props.toolName}
          </Link>
        </td>
      </tr>
    </>
  );
  }
