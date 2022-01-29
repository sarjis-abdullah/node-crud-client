import React, { useState, useEffect } from "react";
import SingleItem from './SingleItem';
import axios from 'axios';


const BASE_URL = "http://localhost:3001/";
function Index() {
  const [cats, setCats] = useState([]);
  const deleteItem = (id)=> {
    setCats(items=> items.filter(item=> item.id !== id))
    axios.delete(BASE_URL + "category/" + id)
  }
  useEffect(() => {
    let respons = fetch(BASE_URL + "category");
    respons
      .then((res) => {
        return res.json()
      })
      .then((d) => {
        setCats(d.data)
      });
  }, []);

  return (
    <div className="container">
      <header className="App-header">MERN Web App</header>
      <table className="w-full">
        <thead className="table--header">
          <tr className="table--header-row">
            <th className="table--row__head">Name</th>
            <th className="table--row__head">Description</th>
            <th className="table--row__head">Action</th>
          </tr>
        </thead>
        <tbody className="table--body">
          {cats && cats.length ? cats.map((item, index) => (
            <SingleItem deleteItem={({id})=> deleteItem(id)} item={item} key={index}/>
          )) : (<tr><td>Loading...</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default Index;
