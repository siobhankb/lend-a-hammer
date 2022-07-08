import React, { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";

export default function ToolRow(props) {
  const [available, setAvailable] = useState();
  const [editMode, setEditMode] = useState(false);
  const myTools = props.myTools;
  console.log("ToolRow myTool=", myTools);
  const toolName = props.toolName;
  const button = useRef(null);

  const params = useParams();

  const changeEditMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  const handleAvailButton = () => {
    // make PUT request to db to change value of myTools[toolName][available] = !myTools[toolName][available]
    button.current.className=''
  };

  console.log("myTools= ", myTools);
  console.log("tool_descr= ", myTools[toolName]["tool_descr"]);

  console.log("modify tool route= ", `/modify/${String(myTools[toolName]["tool_id"])}`);


  return (
    // ["Available", "Tool Name", "Tool Description", "Category"]
    <>
      <tr>
        <td className="text-center" scope="col">
          {myTools[toolName]["available"] == true ? (
            <button
              onClick={handleAvailButton}
              ref={button}
              className="bg-success bg-opacity-25 fw-bold text-dark"
            >
              Available
            </button>
          ) : (
            <button
              onClick={handleAvailButton}
              ref={button}
              className="bg-secondary bg-opacity-10 text-dark"
            >
              Unavailable
            </button>
          )}
        </td>
        <td className="fw-bold" id={myTools[toolName]["tool_id"]}>
          {toolName}
        </td>
        <td>{myTools[toolName]["tool_descr"]}</td>
        <td>{myTools[toolName]["tool_cat"]}</td>
        <td>
          <button
            onClick={changeEditMode}
            className="btn bg-primary bg-opacity-50 text-dark"
          >
            Edit
          </button>
          {/* <Link
            className="btn bg-primary bg-opacity-50 text-dark"
            to={`/modify/${params.toolId}`}
            flashMessage={props.flashMessage}
            toolId={myTools[toolName]["tool_id"]}
            toolName={toolName}
            myTools={myTools}
          >
            Modify
          </Link> */}
        </td>
        {editMode ? (
        <td> </td>
        ) : (null)}
      </tr>
    </>
  );
}
