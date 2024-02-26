import React from "react";

interface Props {
  todos: {
    title: string;
    content: string;
  }[];
  onAdd: () => void;
}

const Todos: React.FunctionComponent<Props> = function Todos({ todos, onAdd }) {
  return (
    <div>
      <h2>My Todos</h2>
      <div>
        {todos.map((todo, index) => (
          <div key={index}>
            <h2>{todo.title}</h2>
            <p>{todo.content}</p>
          </div>
        ))}
        <button onClick={onAdd}>Add Todo</button>
      </div>
    </div>
  );
};

export default Todos;
