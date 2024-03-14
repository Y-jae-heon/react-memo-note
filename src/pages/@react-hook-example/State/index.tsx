import React, { useState } from "react";

function State() {
  const [state, setState] = useState({ count: 0 });
  console.log("State Hook이 prev를 반환할 시 Rerendering 일어나지 않음");
  console.log(
    "State Hook이 Object 또는 Array 일 시 같은 값이여도 Rerendering이 일어남"
  );
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
