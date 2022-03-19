import React from "react";

import "./todo.css";

function Todo({ todo, deleteHandler }) {
  return (
    <div className="row">
      <div className="column">
        <h4>ID</h4>
        <div>{todo.id}</div>
      </div>
      <div className="column">
        <h4>Date</h4>
        <div>{todo.date}</div>
      </div>
      <div className="column">
        <h4>Todo</h4>
        <div>{todo.name}</div>
      </div>
      <div className="column">
        <h4>comment</h4>
        <div>{todo.comment}</div>
      </div>
      <div id="button">
        <button
          onClick={() => {
            deleteHandler(todo.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(Todo);
