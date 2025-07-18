import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
const App = () => {
  const [todo, settodo] = useState("");
  const [editId, seteditId] = useState(null);
  const [showFinished, setshowFinished] = useState(false);
  const [todos, settodos] = useState(() => {
    let savedTodos = localStorage.getItem("savedTodosLC");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedTodosLC", JSON.stringify(todos));
  }, [todos]); //runs on every change

  const handleAdd = () => {
    if (todo.trim() === "") {
      alert("Enter a Todo First");
      return;
    }
    if (editId) {
      const editedTodos = todos.map((item) => {
        return editId === item.id ? { ...item, todo } : item;
      });
      settodos(editedTodos);
      seteditId(null);
      return;
    } else {
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]); //inside todos inserting obj
    }
    settodo("");
  };
  const handleDelete = (e, id) => {
    console.log("the id is " + id);
    const newTodos = todos.filter((item) => item.id !== id);
    settodos(newTodos);
  };

  const handleEdit = (e, id) => {
    // console.log("the id is "+id);
    let index = todos.findIndex((item) => id === item.id);
    settodo(todos[index].todo);
    seteditId(id);
  };
  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheck = (e) => {
    let id = e.target.id;
    // console.log(id);

    let index = todos.findIndex((item) => {
      //wpuld return the index where this gets true
      return id === item.id;
    });
    // console.log(index);

    let tempTodos = [...todos];
    tempTodos[index].isCompleted = !tempTodos[index].isCompleted;
    settodos(tempTodos); //same todos but with only one change
    // console.log(tempTodos[index].isCompleted);
  };

  return (
    <>
      <Navbar />
      <div className="container min-h-[90vh] md:min-h-[85vh] bg-emerald-100 w-[95vw] mx-auto mt-6 rounded-2xl">
        <div className="AddTodo pt-3 mb-4 md:mb-0 gap-3 flex flex-col md:flex-row md:justify-center items-center md:py-3 md:gap-5 md:pt-5">
          <h2 className="font-bold w-fit">
            {editId ? "Edit your Todo" : "Add a Todo"}
          </h2>
          <div className="flex w-[90%] md:w-auto"> 
            <input
              type="text"
              value={todo}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAdd();
                }
              }}
              onChange={handleChange}
              className="border border-gray-400 w-[90%] md:w-[50vw] rounded-3xl px-5 py-1 mx-2 bg-white text-black"
            />
            <button
              onClick={handleAdd}
              className="border px-5 rounded-2xl bg-green-500 hover:scale-110 cursor-pointer"
            >
              {editId ? "Save Edit" : "Add"}
            </button>
          </div>
        </div>
        {todos.length > 0 && (
          <div className="flex flex-col md:flex-row items-center md:gap-10 justify-center items-center">
            <h2 className="font-extrabold text-2xl md:mt-1">Your To-Dos</h2>
            <div className="belowAdd flex gap-10 mt-2 md:mt-0">
              <span className="flex gap-2.5 mt-2">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => setshowFinished(!showFinished)}
                  checked={showFinished}
                />
                Show Finished
              </span>
              <button
                style={{ backgroundColor: "#dde693" }}
                onClick={() => settodos([])}
                className="border px-5 rounded-2xl  hover:scale-110 cursor-pointer mt-2"
              >
                Clear List
              </button>
            </div>
          </div>
        )}
        <div className="bg-black h-0.5 w-[70%] mx-auto mb-7 md:mb-5 my-4 opacity-10 rounded-3xl"></div>

        <div className="Todos">
          {/* <div className="todo flex ml-10 gap-4">
            <div>hello</div>
            <div className="buttons flex gap-2">
              <button
                onClick={handleEdit}
                className="border px-5 rounded-2xl bg-green-500 hover:scale-110 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="border px-5 rounded-2xl bg-green-500 hover:scale-110 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div> */}
          {todos.length == 0 && (
            <div className="flex justify-center mt-7 font-extrabold text-2xl">
              Add Todos
            </div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  className="todo flex  justify-around my-5"
                  key={item.id}
                >
                  <div className="listing flex gap-4">
                    <input
                      type="checkbox"
                      id={item.id}
                      onChange={handleCheck}
                      checked={item.isCompleted}
                    />
                    <div
                      className={`${
                        item.isCompleted ? "line-through" : ""
                      } w-[40vw] md:w-60 break-words whitespace-pre-wrap max-h-32 overflow-auto`}
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex gap-2 justify-center items-center ">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="border w-15 h-7 px-5 rounded-2xl bg-green-500 hover:scale-110 cursor-pointer"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="border w-15 h-7 px-5 rounded-2xl bg-green-500 hover:scale-110 cursor-pointer"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
