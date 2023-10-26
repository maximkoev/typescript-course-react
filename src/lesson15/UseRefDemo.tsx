import React, { useEffect } from "react";

export function UseRefDemo() {
  // sample 1
  const ref = React.useRef<HTMLInputElement>(null);
  console.log("render", ref.current);

  useEffect(() => {
    console.log("useEffect", ref);
    // if (ref && ref.current) {
    //   ref.current.focus();
    // }
    ref?.current?.focus();

    // (document.querySelector("#my_input") as HTMLInputElement)?.focus();
  }, []);

  // sample 2
  const [count, setCount] = React.useState<number>(0);
  const numref = React.useRef<number>(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  // render count
  numref.current++;

  return (
    <>
      <input type="text" ref={ref} id="my_input" />

      <div>Count: {count}</div>
      <div>Compoment render count: {numref.current} </div>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </>
  );
}
