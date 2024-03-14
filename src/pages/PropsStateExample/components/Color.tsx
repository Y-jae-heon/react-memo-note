import React, { useState } from "react";

function Color({ messageColor }: { messageColor: string }) {
  const [color, setColor] = useState(
    messageColor === "black" ? "red" : "yellow"
  );
  console.log("하위 <<<<", messageColor);
  return <div>{color}</div>;
}

export default Color;
