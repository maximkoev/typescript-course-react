import { useId, useReducer, useState } from "react";
import { CountAction, CountActionKind, CountState } from "./Data/types";

// reducer accepts state and action. Action is changing state on dispatch
function counterReducer(state: CountState, action: CountAction) {
  const { type, payload } = action;
  switch (type) {
    case CountActionKind.INCREASE:
      console.log(`actione: ${action.type} state`, state);
      return {
        ...state,
        count: state.count + payload,
      };
    case CountActionKind.DECREASE:
      console.log(`action: ${action.type} state`, state);
      return {
        ...state,
        count: state.count - payload,
      };
    default:
      return state;
  }
}

export function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  const [payload, setPayload] = useState<number>(1);
  const inputId = useId();
  return (
    <>
      <br />
      <label id={inputId} htmlFor={inputId}>
        {" "}
        Set step{" "}
      </label>
      <input
        id={inputId}
        type="number"
        defaultValue="1"
        value={payload}
        onChange={(e) => setPayload(Number.parseInt(e.target.value))}
      ></input>
      <div>
        Count: {state.count}
        <button
          onClick={() =>
            dispatch({ type: CountActionKind.DECREASE, payload: payload })
          }
        >
          -
        </button>
        <button
          onClick={() =>
            dispatch({ type: CountActionKind.INCREASE, payload: payload })
          }
        >
          +
        </button>
      </div>
    </>
  );
}

{
}
