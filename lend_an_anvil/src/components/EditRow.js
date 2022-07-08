import React, { useEffect, useRef } from 'react'

export default function EditRow(props) {

    const myTools = props.myTools
    const toolName = props.toolName
    const toolDescr = props.toolDescr
    const toolCat = props.toolCat

    const edit = useRef();

    const handleEditSubmit = (e) => {
      e.preventDefault();
      let name = e.target.toolName.value;
      let descr = e.target.toolDescr.value;
      let cat = e.target.toolCat.value;

      let data = JSON.stringify({
        tool_id: myTools.tool_id,
        tool_name: name,
        tool_descr: descr,
        category: cat,
        available: true,
      });
      console.log("stringified form data= ", data);

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
      console.log(localStorage.getItem("token"));

      fetch("http://127.0.0.1:5000/tools", {
        method: "PUT",
        headers: myHeaders,
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            props.flashMessage(data.error, "danger");
          } else {
            let t = data;
            setNewTool(t);
            props.flashMessage(
              `You have added ${t.tool_name} to your lending list!`,
              "success"
            );
            console.log(t);
          }
        })
        .catch((error) => console.log("error", error));
      form.current.reset();
    };

  return (
    <>
      <form
        ref={edit}
        onSubmit={handleEditSubmit}
        className="form-control my-3"
      >
        <tr>
          <th>
            <label htmlFor="toolName" className="col-sm-3 col-form-label">
              Tool Name:
            </label>
          </th>
          <th>
            <label htmlFor="toolDescr" className="col-sm-3 col-form-label">
              Description:
            </label>
          </th>
          <th>
            <label htmlFor="toolCat" className="col-sm-3 col-form-label">
              Category:
            </label>
          </th>
          <th>
            <label htmlFor="editButton" className="col-sm-3 col-form-label">
              {""}
            </label>
          </th>
        </tr>
        <tr>
          <td>
            <input type="text" className="form-control" name="toolName" />
          </td>
          <td>
            <input type="text" className="form-control" name="toolDescr" />
          </td>
          <td>
            <input type="text" className="form-control" name="toolCat" />
          </td>
          <td>
            <button
              type="submit"
              onSubmit={handleEditSubmit}
              className="btn bg-info bg-opacity-50 text-dark"
            >
              Update
            </button>
          </td>
        </tr>
      </form>
    </>
  );
}
