import React, { useState } from "react";

function State() {
  const [state, setState] = useState({ count: 0 });
  console.log("<<<<<<< rerendering");
  return (
    <div>
      {state.count}
      <button
        onClick={() =>
          setState((prev) => {
            return { count: prev.count + 1 };
          })
        }
      >
        Click Me !
      </button>
    </div>
  );
}

export default State;
