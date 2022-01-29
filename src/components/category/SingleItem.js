import React, { useState } from "react";
import "./category.css";

export default function SingleItem(props) {
    let {item, deleteItem} = props
  const [editMode, setEditMode] = useState(false);
  const handleName = (e) => {
    item.name = e.target.value;
    console.log(item.name, e.target.value);
  };
  return (
    <tr className="table--row">
      <td className="table--row__data">
        {editMode ? (
          <input value={item.name} onChange={(e) => handleName(e)} />
        ) : (
          <span>{item.name}</span>
        )}
      </td>
      <td className="table--row__data">
        {editMode ? (
          <input value={item.description || ""} onChange={(e) => handleName(e)} />
        ) : (
          <span>{item.description}</span>
        )}
      </td>
      <td className="table--row__data">
        <div className="htree-dot-icon">
          <button onClick={() => setEditMode((mode) => !mode)}>
            {editMode ? "Update" : "Edit"}
          </button>
          <button onClick={()=>deleteItem(item)}>Delete</button>
          {/* <input type="checkbox" className="hidden toggle" id="1"/>
            <label for="1">hello</label>
            <div className="hidden toggle__menu">
                lorem ipsum
            </div> */}
        </div>
      </td>
    </tr>
  );
}
