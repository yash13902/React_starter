import React, { useState, useEffect } from "react";
import "./style.css";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("myTodoList")) || [];
  });
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //   add the items function
  const addItems = () => {
    if (!inputData) {
      alert("Please Fill the Data");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setIsEditItem(null);
      setInputData("");
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //   delete the Items function
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  //   remove all items
  const removeAll = () => {
    setItems([]);
  };

  //   edit items
  const editItems = (index) => {
    const item_todo_edit = items.find((curElem) => {
      return curElem.id === index;
    });

    setIsEditItem(index);
    setInputData(item_todo_edit.name);
    setToggleButton(true);
  };

  //   adding localStorage

  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="images/todo.svg" alt="todo logo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Item"
              className="form-control"
              value={inputData}
              onChange={(event) => {
                setInputData(event.target.value);
              }}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItems}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItems}></i>
            )}
          </div>

          {/* Show our Items  */}

          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name} </h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItems(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remove all - Button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
