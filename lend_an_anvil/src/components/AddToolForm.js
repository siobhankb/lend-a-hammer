import React, { useState } from 'react'

export default function AddToolForm(props) {
    const [hello, sayHello] = useState();

    const handleFormSubmit = (e) => {
        let name = e.target.toolName.value;
        let descr = e.target.toolDescr.value;
        let cat = e.target.toolCat.value;

        let data = {
            lender_id: props.lenderID,
            tool_name: name,
            tool_descr: descr,
            category: cat,
            available: true
        }

        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)

        fetch("http://127.0.0.1:5000/tools", {
          methods: "POST",
          headers: myHeaders,
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              props.flashMessage(data.error, "danger");
            } else {
                let t = data
              console.log(t)
            }
          })
          .catch((error) => console.log("error", error));
    }

  return (
    <>
      <div className="row">
        <div className="card col-8 mx-auto mt-4">
          <div className="card-body">
            <h4 className="card-header card-title"> Add a New Tool to Lend </h4>
            <form className="form-control my-3">
              <div className="mb-3 row mt-2">
                <label htmlFor="toolName" className="col-sm-2 col-form-label">
                  Tool Name:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="toolName"
                    rows="2"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="toolDescr" className="col-sm-2 col-form-label">
                  Description:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="toolDescr"
                    rows="2"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="toolCat" className="col-sm-2 col-form-label">
                  Category (#):
                </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="toolCat" />
                </div>
              </div>
            </form>
            <h5 className="form-control card-footer"> button for submit </h5>
          </div>
        </div>
      </div>
    </>
  );
}

