import React, { useRef, useState } from "react";
import { Todos } from "@/components";

function TodoList() {
  const [todos, setTodos] = useState<
    {
      title: string;
      content: string;
    }[]
  >([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = () => {
    if (titleRef.current && contentRef.current) {
      setTodos((prev) => {
        if (titleRef.current && contentRef.current) {
          const title = titleRef.current.value;
          const content = contentRef.current.value;
          titleRef.current.value = "";
          contentRef.current.value = "";
          return [
            ...prev,
            {
              title,
              content,
            },
          ];
        }
        return [...prev];
      });
    }
  };

  return (
    <div>
      <Todos todos={todos} onAdd={handleAddTodo} />
      <input ref={titleRef} placeholder="제목" />
      <input ref={contentRef} placeholder="내용" />
    </div>
  );
}

export default TodoList;
