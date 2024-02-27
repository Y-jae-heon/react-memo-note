import React from "react";

interface Props {
  todos: {
    title: string;
    content: string;
    isEdit: boolean;
  }[];
  onEditContent?: ({
    title,
    content,
    index,
  }: {
    title: string;
    content: string;
    index: number;
  }) => void;
  onEdit?: ({ index }: { index: number }) => void;
}

const EditTodos: React.FunctionComponent<Props> = function EditTodos({
  todos,
  onEditContent,
  onEdit,
}) {
  const handleEditTodoContent = (
    type: "title" | "content",
    value: string,
    index: number
  ) => {
    if (type === "title") {
      console.log({
        title: value,
        content: todos[index].content,
        index,
      });
      onEditContent?.({ title: value, content: todos[index].content, index });
    } else if (type === "content") {
      onEditContent?.({ title: todos[index].title, content: value, index });
    }
  };

  const handleEdit = (index: number) => {
    onEdit?.({ index });
  };

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
          <input
            onChange={(evt) =>
              handleEditTodoContent("title", evt.target.value, index)
            }
            value={todo.title}
          />
          <input
            onChange={(evt) =>
              handleEditTodoContent("content", evt.target.value, index)
            }
            value={todo.content}
          />
          <button onClick={() => handleEdit(index)}>Edit Complete</button>
        </div>
      );
    }
    return (
      <div key={index}>
        <h2>{todo.title}</h2>
        <p>{todo.content}</p>
        <button onClick={() => handleEdit(index)}>Edit Start</button>
      </div>
    );
  };

  return (
    <div>
      <h2>My Todos</h2>
      <div>
        {todos.map((todo, index) => renderTodo(todo, index))}
        {/* <button onClick={onAdd}>Add Todo</button> */}
      </div>
    </div>
  );
};

export default EditTodos;
