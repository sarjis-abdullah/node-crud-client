import React, { useState, useEffect } from "react";
import SingleItem from "./SingleItem";
import axios from "axios";

const BASE_URL = "http://localhost:3001/";
function Index() {
  const [cats, setCats] = useState([]);
  const deleteItem = (id) => {
    setCats((items) => items.filter((item) => item.id !== id));
    axios.delete(BASE_URL + "category/" + id);
  };
  const updateItem = (updatedItem)=> {
    console.log(updatedItem);
    let items = cats.map((item) => {
      if(item.id === updatedItem.id){
        return{
          ...updatedItem,
          name: updatedItem.name,
          description: updatedItem.description,
        }
      }
      return item;
    })
    setCats(data=> items);
    axios.put(BASE_URL + "category/" + updatedItem.id, updatedItem)
  }
  useEffect(() => {
    let respons = fetch(BASE_URL + "category");
    respons
      .then((res) => {
        return res.json();
      })
      .then((d) => {
        setCats(d.data);
      });
  }, []);

  return (
    <div className="container">
      <section className="table-header">
        <header className="App-header">MERN Web App</header>
        <div className="justify-self-end">
          <button className="primary-btn">Add New Category</button>
        </div>
      </section>
      <table className="w-full">
        <thead className="table--header">
          <tr className="table--header-row">
            <th className="table--row__head">Name</th>
            <th className="table--row__head">Description</th>
            <th className="table--row__head">Action</th>
          </tr>
        </thead>
        <tbody className="table--body">
          {cats && cats.length ? (
            cats.map((item, index) => (
              <SingleItem
                deleteItem={({ id }) => deleteItem(id)}
                updateItem={(item) => updateItem(item)}
                item={item}
                key={index}
              />
            ))
          ) : (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Index;
