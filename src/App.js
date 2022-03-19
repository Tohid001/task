// import { useState } from "react";
import React, { useState } from "react";
import Form from "./Form.jsx";
import Todo from "./Todo.jsx";
function App() {
  const [todos, setTodos] = useState([]);
  const deleteHandler = (id) => {
    const filteredTodos = todos.filter((todo, index) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const addTodoHandler = (newTodo) => {
    setTodos([...todos, newTodo]);
  };
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
