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
      <div className="container min-h-[86vh] bg-emerald-100 w-[95vw] mx-auto mt-6 rounded-2xl">
        <div className="AddTodo flex justify-center items-center py-3 gap-5 pt-5">
          <h2 className="font-bold">
            {editId ? "Edit your Todo" : "Add a Todo"}
          </h2>
          <input
            type="text"
            value={todo}
            onKeyDown={(e)=>{
              if (e.key==="Enter") {
                handleAdd();
              }
            }}
            onChange={handleChange}
            className="border border-gray-400 w-1/2 rounded px-2 py-1 mx-2 bg-white text-black"
          />
          <button
            onClick={handleAdd} 
            className="border px-5 rounded-2xl bg-green-500 hover:scale-110 cursor-pointer"
          >
            {editId ? "Save Edit" : "Add"}
          </button>
        </div>
        {todos.length>0 &&
        <div className="flex items-center gap-10 justify-center">
          <h2 className="font-extrabold ml-10 text-2xl mt-1">Your To-Dos</h2>
          <span className="flex gap-2.5 mt-2">
            <input type="checkbox" name="" id="" onChange={()=>setshowFinished(!showFinished)} checked={showFinished}/>
            Show Finished
          </span>
          <button style={{ backgroundColor: "#dde693" }}
            onClick={()=>settodos([])} 
            className="border px-5 rounded-2xl  hover:scale-110 cursor-pointer mt-2"
          >Clear List
          </button>
        </div>}
        <div className="bg-black h-0.5 w-[70%] mx-auto mb-5 my-4 opacity-10 rounded-3xl"></div>

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
              
            (showFinished||!item.isCompleted) && <div className="todo flex  ml-10 justify-around my-3" key={item.id}>
                <div className="listing flex gap-4">
                  <input type="checkbox" id={item.id} onChange={handleCheck} checked={item.isCompleted} />
                  <div
                    className={`${item.isCompleted ? "line-through" : ""} w-60`}
                  >
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex gap-2">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="border px-5 rounded-2xl bg-green-500 hover:scale-110 cursor-pointer"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="border px-5 rounded-2xl bg-green-500 hover:scale-110 cursor-pointer"
                  >
                   <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
