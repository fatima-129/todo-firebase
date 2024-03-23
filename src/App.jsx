import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "./App.css";
import useItem from "./hooks/useItem";

const App = () => {
  const [item, setItem] = useState({ title: "", price: "" });
  const {
    deleteItemFromFirebase,
    fetchItemsFromFirebase,
    itemList,
    saveItemToFirebase,
  } = useItem();

  useEffect(() => {
    const unsubscribe = fetchItemsFromFirebase();
    return () => unsubscribe();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(saveItemToFirebase(item), {
      loading: "Saving Item to firebase...",
      success: <b>Item saved!</b>,
      error: <b>Could not save the item.</b>,
    });
  };

  const handleDelete = (id) => {
    toast.promise(deleteItemFromFirebase(id), {
      loading: "Deleting Item to firebase...",
      success: <b>Item Deleted!</b>,
      error: <b>Could not delete the item.</b>,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={item.title}
          required
          onChange={(e) =>
            setItem((pre) => ({ ...pre, title: e.target.value }))
          }
        />
        <input
          name="price"
          required
          type="text"
          placeholder="Price"
          value={item.price}
          onChange={(e) =>
            setItem((pre) => ({ ...pre, price: e.target.value }))
          }
        />
        <button type="submit">Add Item</button>
      </form>
      <div className="item-list">
        {itemList.map((item, id) => (
          <div key={id} className="item">
            <h2>{item.title}</h2>
            <p>{item.price}</p>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
