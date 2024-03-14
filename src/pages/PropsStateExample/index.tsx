import React, { useState } from "react";
import Color from "./components/Color";

function PropsStateExample() {
  const [messageColor, setMessageColor] = useState("black");
  console.log("상위 <<<<", messageColor);
  return (
    <div>
      <button onClick={() => setMessageColor("blue")}>상위 변경</button>
      {messageColor}
      <Color messageColor={messageColor} />
    </div>
  );
}

export default PropsStateExample;
