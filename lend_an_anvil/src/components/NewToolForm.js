// form for Lender to add tool to collection 
// must have:
// --tool name
// --tool descr
// --drop-down to choose tool category...
// --add to collection button (that triggers adding new tool to db)
// --button to set available/not available
import React, { useEffect, useState, useMemo } from 'react';


export default function NewToolForm(props) {
    
    // make POST request to tools db
    const [allCats, setAllCats] = useState('');
    const [headCats, setHeadCats] = useState('');
    const [headCatList, setHeadCatList] = useState('');
    const [topCategory, setTopCategory] = useState('');
    const [childCatList, setChildCatList] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

  useMemo(() => {
    let isMounted = true;
      fetch("http://127.0.0.1:5000/tool-categories")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            props.flashMessage(data.error, "danger");
          } else {
            if (isMounted) {
              let c = data;
              setAllCats(c);
            }
          }
        });
    return () => { isMounted = false }
    }, []); 
  
    useEffect(() => {
      fetch("http://127.0.0.1:5000/head-categories")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            props.flashMessage(data.error, "danger");
          } else {
            let x = data
              setHeadCats(x);
              console.log('headCats = ', headCats)
            let l = Object.keys(data);
            setHeadCatList(l);
          }
        });
      console.log("headCatList = ", headCatList);
    }, []); 


    const changeCategory = (e) => {
      let x = e.target.value;
      setTopCategory(x);
      console.log("topCategory = ", topCategory);
      let parentId = allCats[x]["cat_id"];
      console.log("parentId= ", parentId);
      const subList = getSubList(parentId);
    }

  const chooseSubCategory = (e) => {
        setSelectedCategory(e.target.value);
    }

    const getSubList = (parentID) => {
      fetch("http://127.0.0.1:5000/childof-" + "7") // parentID
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            props.flashMessage(data.error, "danger");
          } else {
            console.log("childof results= ", data);
            let z = data
            setChildCatList(z);
            console.log("set childCatList to --> ", childCatList);
            return data;
          }
        });
    }

  return headCats ? (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add Tools</h5>
          <p className="card-text">
            Please tell us about the tool you'd like to share:
          </p>
          <form className="form-control">
            {!topCategory ? (
              <select
                value={topCategory}
                onChange={changeCategory}
                className="form-select"
                aria-label="Default select example"
              >
                <option value>Choose Category:</option>
                {headCatList.map((head, i) => (
                  <option value={head} key={i}>
                    {head}
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={selectedCategory}
                onChange={chooseSubCategory}
                className="form-select"
                aria-label="Default select example"
              >
                <option value>Choose Category:</option>
                {childCatList.map((child, i) => (
                  <option value={child} key={i}>
                    {child}
                  </option>
                ))}
              </select>
            )}
          </form>
        </div>
        <div className="card-footer">
          <h5 className="card-title">thanks for sharing!</h5>
        </div>
      </div>
    </>
  ) : null;
}
