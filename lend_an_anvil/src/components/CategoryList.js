import React, { useState, useMemo } from "react";

export default function CategoryList(props) {
  // make POST request to tools db
  const [allCats, setAllCats] = useState("");
  const [headCats, setHeadCats] = useState("");
  const [headCatList, setHeadCatList] = useState("");
  const [topCategory, setTopCategory] = useState("");
  const [childCatList, setChildCatList] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useMemo(() => {
    let isMounted = true;
    fetch("http://127.0.0.1:5000/tool-categories")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          console.log('Error getting categories: ', data.error)
        } else {
          if (isMounted) {
            let c = data;
            setAllCats(c);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
    
    const changeCategory = (e) => {
      let x = e.target.value;
      setTopCategory(x);
      console.log("topCategory = ", topCategory);
      let parentId = allCats[x]["cat_id"];
      console.log("parentId= ", parentId);
    //   const subList = getSubList(parentId);
    };

  return (
    <>
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
        ) : ( null
        //   <select
        //     value={selectedCategory}
        //     onChange={chooseSubCategory}
        //     className="form-select"
        //     aria-label="Default select example"
        //   >
        //     <option value>Choose Category:</option>
        //     {childCatList.map((child, i) => (
        //       <option value={child} key={i}>
        //         {child}
        //       </option>
        //     ))}
        //   </select>
        )}
      </form>
    </>
  );
}
