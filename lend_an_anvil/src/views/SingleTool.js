// page with route to tool/toolId
// will show the ToolCard
// plus space at the bottom for modifying info...

import React from 'react'
import UpdateToolForm from '../components/UpdateToolForm'

export default function SingleTool(props) {
  //props: thisTool, myTools

  return (
    <>
      <UpdateToolForm thisTool={props.thisTool} myTools={props.myTools} />
    </>
  )
}
