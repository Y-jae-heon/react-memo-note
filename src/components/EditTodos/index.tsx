import React from "react";

interface Props {
  todos: {
    title: string;
    content: string;
    isEdit: boolean;
  }[];
  onAdd: () => void;
}

const EditTodos: React.FunctionComponent<Props> = function EditTodos({
  todos,
  onAdd,
}) {
  const renderTodo = (
    todo: {
      title: string;
      content: string;
      isEdit: boolean;
    },
    index: number
  ) => {
    if (todo.isEdit) {
      return (
        <div key={index}>
          <input value={todo.title} />
          <input value={todo.content} />
        </div>
      );
    }
    return (
      <div key={index}>
        <h2>{todo.title}</h2>
        <p>{todo.content}</p>
      </div>
    );
  };
  return (
    <div>
      <h2>My Todos</h2>
      <div>
        {todos.map((todo, index) => renderTodo(todo, index))}
        <button onClick={onAdd}>Add Todo</button>
      </div>
    </div>
  );
};

export default EditTodos;
