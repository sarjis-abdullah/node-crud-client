import React, { useState, useEffect } from "react";
import "./category.css";

export default function SingleItem(props) {
  let { item, deleteItem, updateItem } = props;
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  useEffect(() => {
      if (item && Object.keys(item).length) {
        setName(item.name)
        setDescription(item.description)
      }
  }, []);

  const handleChanges = (e) => {
    const val = e.target.value
    if (e.target.name === "name") {
      setName(val)
    }else if(e.target.name === "description"){
      setDescription(val)
    }
  };
  const toggleEditMode = ()=> {
    setEditMode((mode) => !mode);
  }
  const update = (item)=> {
    console.log("Updated", item);
    toggleEditMode();
    updateItem({
      ...item,
      description,
      name
    })
  }
  
  return (
    <tr className="table--row">
      <td className="table--row__data">
        {editMode ? (
          <input value={name} name="name" onChange={(e) => handleChanges(e)} />
        ) : (
          <span>{item.name}</span>
        )}
      </td>
      <td className="table--row__data">
        {editMode ? (
          <input
            value={description || ""}
            name="description"
            onChange={(e) => handleChanges(e)}
          />
        ) : (
          <span>{item.description}</span>
        )}
      </td>
      <td className="table--row__data">
        <div className="htree-dot-icon">
          <button
            className="secondary-btn"
            onClick={() => editMode? update(item) : toggleEditMode()}
          >
            {editMode ? "Update" : "Edit"}
          </button>
          <button className="danger-btn" onClick={() => deleteItem(item)}>
            Delete
          </button>
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
