// page with route to tool/toolId
// will show the ToolCard
// plus space at the bottom for modifying info...

import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import CategoryList from '../components/CategoryList';
import UpdateToolForm from '../components/UpdateToolForm';

export default function SingleTool(props) {
  // flashMessage={props.flashMessage}
  //           toolId={myTools[toolName]["tool_id"]}
  //           toolName={toolName}
  //           myTools={myTools}
  

  let params = useParams();
  console.log('params= ', params)

  const myTools = props.myTools
  const editToolName = myTools[props.toolName]
  const editToolId = props.toolId

  
  return (
    <>
      <div className="row">
        <UpdateToolForm toolId={params.toolId} myTools={myTools} editToolId={editToolId} editToolName={editToolName} />
      </div>
    </>
  );
}

