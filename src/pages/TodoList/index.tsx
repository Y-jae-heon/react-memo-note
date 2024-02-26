import React, { useCallback, useState } from "react";
import { Todos } from "@/components";

function TodoList() {
  const [todos, setTodos] = useState<
    {
      title: string;
      content: string;
    }[]
  >([]);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleAddTodo = useCallback(() => {
    setTodos((prev) => [
      ...prev,
      {
        title,
        content,
      },
    ]);
    setTitle("");
    setContent("");
  }, [title, content]);

  return (
    <div>
      <Todos todos={todos} onAdd={handleAddTodo} />
      <input
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
        placeholder="제목"
      />
      <input
        value={content}
        onChange={(evt) => setContent(evt.target.value)}
        placeholder="내용"
      />
    </div>
  );
}

export default TodoList;
