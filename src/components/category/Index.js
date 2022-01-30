import React, { useState, useEffect } from "react";
import SingleItem from "./SingleItem";
import axios from "axios";

const BASE_URL = "http://localhost:3001/";
function Index() {
  const [cats, setCats] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteItem = (id) => {
    setCats((items) => items.filter((item) => item.id !== id));
    axios.delete(BASE_URL + "category/" + id);
  };
  const updateItem = (updatedItem) => {
    let items = cats.map((item) => {
      if (item.id === updatedItem.id) {
        return {
          ...updatedItem,
          name: updatedItem.name,
          description: updatedItem.description,
        };
      }
      return item;
    });
    setCats((data) => items);
    axios.put(BASE_URL + "category/" + updatedItem.id, updatedItem);
  };

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

  const Loader = () => {
    return <div className="loader"></div>;
  };

  const CategoryForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [nameError, setNameError] = useState("");
    const [isDisable, setIsDisable] = useState(true);
    const handleChanges = (e) => {
      let val = e.target.value;
      let n = e.target.name;
      if (n === "name") {
        setName(val);
      } else if (n === "description") {
        setDescription(val);
      }
    };

    const submitItem = async (e) => {
      e.preventDefault();
      setLoading((mode) => !mode);
      const obj = { name, description };
      const response = await axios.post(BASE_URL + "category", obj);
      setCats((items) => {
        return [response.data, ...items];
      });
      setLoading((mode) => !mode);
    };

    const handleOnblur = async (hasOnblur = false) => {
      if (hasOnblur && name && name.length) {
        axios
          .post(BASE_URL + "validate-category-name", { name })
          .then((res) => {
            setIsDisable(false);
            setNameError("")
            return res;
          })
          .catch((err) => {
            setIsDisable(true);
            if (err?.response?.data?.error?.message) {
              setNameError(err.response.data.error.message);
            }
            return Promise.reject(err);
          });
      }
    };

    const disabled = () => {
      if (isDisable) return true;
      if (name && name.length && description && description.length) {
        return false;
      }
      return true;
    };
    const inputs = [
      {
        type: "text",
        name: "name",
        placeholder: "Name",
        label: "Name",
        value: name,
        hasOnblur: true,
      },
      {
        type: "text",
        name: "description",
        placeholder: "Description",
        label: "Description",
        value: description,
        hasOnblur: false,
      },
    ];

    return (
      <section>
        <form className="category-form" onSubmit={submitItem}>
          {inputs.map((item) => (
            <div key={item.name} className="form-input">
              <label>{item.label}</label>
              <input
                className="input-box"
                type={item.type}
                name={item.name}
                value={item.value}
                onBlur={() => handleOnblur(item.hasOnblur)}
                onChange={(e) => handleChanges(e)}
              />
              {nameError && item.hasOnblur ? (
                <>
                  <span></span>
                  <span>{nameError}</span>
                </>
              ) : (
                ""
              )}
            </div>
          ))}
          <div className="form-cta">
            <div></div>
            <button
              disabled={`${disabled() ? "disabled" : ""}`}
              className={`${disabled() ? "disable-btn" : "secondary-btn"}`}
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    );
  };

  return (
    <div className="container relative">
      <section className="table-header">
        {loading && <Loader />}
        <header className="App-header">MERN Web App</header>
        <div className="justify-self-end">
          <button
            onClick={() => setShowAddForm((mode) => !mode)}
            className="primary-btn"
          >
            Add New Category
          </button>
        </div>
      </section>
      {showAddForm ? <CategoryForm /> : ""}
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
