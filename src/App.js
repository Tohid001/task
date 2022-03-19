// import { useState } from "react";
import React, { useState, useCallback } from "react";
import Form from "./Form.jsx";
import Todo from "./Todo.jsx";
// import { todos as items } from "./data.js";
function App() {
  const [todos, setTodos] = useState([]);

  const deleteHandler = useCallback((id) => {
    setTodos((prev) => {
      const filteredTodos = prev.filter((todo, index) => todo.id !== id);
      return filteredTodos;
    });
  }, []);

  const addTodoHandler = useCallback((newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
  }, []);

  return (
    <>
      <Form addTodoHandler={addTodoHandler} />
      <div className="TodoContainer">
        {todos.map((todo, index) => {
          return <Todo todo={todo} key={index} deleteHandler={deleteHandler} />;
        })}
      </div>
    </>
  );
}

export default App;
