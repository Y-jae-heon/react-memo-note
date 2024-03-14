import React, { useRef } from "react";

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
  const todoTitleRef = useRef<HTMLInputElement[]>([]);
  const todoContentRef = useRef<HTMLInputElement[]>([]);

  const handleEdit = (index: number) => {
    console.log(todoTitleRef.current[index].value, "<<<<<");
    console.log(todoContentRef, "<<<<<");
    onEditContent?.({
      title: todoTitleRef.current[index].value,
      content: todoContentRef.current[index].value,
      index,
    });
    onEdit?.({ index });
  };

  const handleEditStart = (index: number) => {
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
            ref={(ref) => {
              if (ref && !todoTitleRef.current[index])
                todoTitleRef.current.push(ref);
              else if (ref) {
                todoTitleRef.current[index] = ref;
              }
            }}
            id={`todo-title-${index}`}
            defaultValue={todo.title}
          />
          <input
            ref={(ref) => {
              if (ref && !todoContentRef.current[index])
                todoContentRef.current.push(ref);
              else if (ref) {
                todoContentRef.current[index] = ref;
              }
            }}
            id={`todo-content-${index}`}
            defaultValue={todo.content}
          />
          <button onClick={() => handleEdit(index)}>Edit Complete</button>
        </div>
      );
    }
    return (
      <div key={index}>
        <h2>{todo.title}</h2>
        <p>{todo.content}</p>
        <button onClick={() => handleEditStart(index)}>Edit Start</button>
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
