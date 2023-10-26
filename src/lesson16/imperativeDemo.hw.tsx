import { forwardRef, useImperativeHandle, useRef, useState } from "react";

// useImperativeHandle allows me directly interact with child element from parent

const ChildComponent = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);

  useImperativeHandle(ref, () => ({
    increment() {
      setCount(count + 1);
    },
    getCount() {
      return count;
    },
  }));

  return <div>{count}</div>;
});

export function ImperativeDemo() {
  const childRef = useRef();

  const handleClick = () => {
    if (childRef.current === undefined) {
      throw new Error("No children element passed");
    } else childRef.current.increment();
  };

  return (
    <>
      <ChildComponent ref={childRef} />
      <button onClick={handleClick}>Increment</button>
    </>
  );
}
