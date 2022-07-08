import React, { useState, useRef } from 'react'

export default function UpdateToolForm(props) {
    const [thisTool, setThisTool] = useState("");
    const form = useRef(null);

    // toolId={params.toolId} myTools={myTools} editToolId={editToolId} editToolName={editToolName}

    const myTools = props.myTools
    const editToolName = props.thisToool

    const handleFormSubmit = (e) => {
      e.preventDefault();
      let name = e.target.toolName.value;
      let descr = e.target.toolDescr.value;
      let cat = e.target.toolCat.value;
      let avail = e.target.avail.value;

      let data = JSON.stringify({
        tool_name: name,
        tool_descr: descr,
        category: cat,
        available: Boolean(avail),
      });
      console.log("stringified form data= ", data);

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );

      fetch("http://127.0.0.1:5000/tools/" + String(thisTool['tool_id']), {
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
            setThisTool(t);
            props.flashMessage(
              `Successfully updated ${t.tool_name}!`,
              "success"
            );
            console.log(t);
            form.current.reset();
          }
        })
        .catch((error) => console.log("error", error));
    };

  return (
    <>
      <div className="card mx-auto mt-4">
        <div className="card-body">
          <h4 className="card-header card-title bg-warning bg-opacity-50">
            {" "}
            Edit Tool{" "}
          </h4>
          <form
            ref={form}
            onSubmit={handleFormSubmit}
            className="form-control my-3"
          >
            <div className="mb-3 row mt-2">
              <label htmlFor="toolName" className="col-sm-3 col-form-label">
                Tool Name:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="toolName"
                  rows="2"
                  placeholder={editToolName}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="toolDescr" className="col-sm-3 col-form-label">
                Description:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="toolDescr"
                  rows="2"
                  placeholder={myTools[editToolName]["tool_descr"]}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="toolCat" className="col-sm-3 col-form-label">
                Category (#):
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="toolCat"
                  placeholder={myTools[editToolName]["tool_cat"]}
                />
                {/* <CategoryList /> */}
                {/* <div id="LOBSelect" class="clearfix displayOnCreate">
                    <span class="label">Dropdown</span>
                    <select
                      name="head-select"
                      class="dk"
                      id="lobSelect"
                    ></select>
                  </div> */}
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="avail" className="col-sm-3 col-form-label">
                Available?
              </label>
              <select value="avail" onChange="" className="form-select">
                <option defaultValue>Set Availablity:</option>
                <option value="Available" key="a">
                  Availalbe
                </option>
                <option value="unavail" key="u">
                  Unavailable
                </option>
              </select>

              {/* <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="avail"
                    rows="2"
                    placeholder={thisTool["available"]}
                  />
                </div> */}
            </div>
            <div className="card-footer text-center">
              <input
                type="submit"
                className="btn btn-warning fw-bold fs-4"
                value="Add Tool"
              />
              {/* <button
                  type="submit"
                  className="btn btn-warning fw-bold fs-4"
                  onSubmit={handleFormSubmit}
                >
                  Add Tool
                </button> */}
              {/* <input
                  type='submit'
                  defaultValue="Add Tool"
                  className="btn btn-warning fw-bold"
                  onSubmit={handleFormSubmit}
                /> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
