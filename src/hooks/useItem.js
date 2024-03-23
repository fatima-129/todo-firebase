import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

const useItem = () => {
  const [itemList, setItemList] = useState([]);

  const fetchItemsFromFirebase = () => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItemList(newData);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  };

  const saveItemToFirebase = async (item) => {
    try {
      await addDoc(collection(db, "todos"), {
        ...item,
      });
      fetchItems();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteItemFromFirebase = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return {
    fetchItemsFromFirebase,
    saveItemToFirebase,
    deleteItemFromFirebase,
    itemList,
  };
};

export default useItem;
