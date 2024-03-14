import React, { useCallback, useReducer } from "react";
import { EditTodos } from "@/components";

interface Todos {
  title: string;
  content: string;
  isEdit: boolean;
}

const initialState: {
  todos: Todos[];
} = {
  todos: [],
};

type ActionType = {
  type: "EDIT_CONTENT" | "ADD" | "EDIT";
  todo?: {
    title: string;
    content: string;
    isEdit: boolean;
  };
  index?: number;
};

function reducer(
  state: {
    todos: Todos[];
  },
  action: ActionType
): {
  todos: Todos[];
} {
  switch (action.type) {
    case "EDIT_CONTENT":
      return {
        ...state,
        todos: state.todos.map((item, index) => {
          if (index === action.index) {
            return {
              title: action.todo?.title || item.title,
              content: action.todo?.content || item.content,
              isEdit: true,
            };
          }
          return {
            ...item,
          };
        }),
      };

    case "ADD":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            title: "New Todo",
            content: "Content",
            isEdit: true,
          },
        ],
      };

    case "EDIT":
      return {
        ...state,
        todos: state.todos.map((item, index) => {
          if (index === action.index) {
            return {
              title: item.title,
              content: item.content,
              isEdit: !item.isEdit,
            };
          }
          return {
            ...item,
          };
        }),
      };
    default:
      break;
  }
  return state;
}

function EditTodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddTodo = useCallback(() => {
    dispatch({
      type: "ADD",
      todo: {
        title: "New Todo",
        content: "New Todo Content",
        isEdit: true,
      },
    });
  }, []);

  const handleEditTodoContent = useCallback(
    ({
      title,
      content,
      index,
    }: {
      title: string;
      content: string;
      index: number;
    }) => {
      dispatch({
        type: "EDIT_CONTENT",
        todo: {
          title,
          content,
          isEdit: true,
        },
        index,
      });
    },
    []
  );

  const handleEdit = ({ index }: { index: number }) => {
    dispatch({
      type: "EDIT",
      index,
    });
  };

  console.log("asdfasdfadsf");

  return (
    <div>
      <EditTodos
        todos={state.todos}
        onEditContent={handleEditTodoContent}
        onEdit={handleEdit}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}

export default EditTodoList;
