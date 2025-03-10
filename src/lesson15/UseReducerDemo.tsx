// @ts-ignore
import React, { useReducer } from "react";

const initialState = {
  loading: false,
  count: 0,
};

interface IState {
  loading: boolean;
  count: number;
}

interface IAction {
  type: string;
}

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case "increment": {
      return { ...state, count: state.count + 1, loading: false };
    }
    case "decrement": {
      return { ...state, count: state.count - 1, loading: false };
    }
    case "loading": {
      return { ...state, loading: true };
    }
    default: {
      return state;
    }
  }
};

const later = (time = 1500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

function PokemonInfo() {
  const [{ count, loading }, dispatch] = useReducer(reducer, initialState);
  const onHandleIncrement = async () => {
    dispatch({ type: "loading" });
    await later(500);
    dispatch({ type: "increment" });
  };
  const onHandleDecrement = async () => {
    dispatch({ type: "loading" });
    await later(500);
    dispatch({ type: "decrement" });
  };
  return (
    <div>
      <p>Count {loading ? "loading.." : count}</p>
      <button type="button" onClick={onHandleIncrement}>
        +
      </button>
      <button type="button" onClick={onHandleDecrement}>
        -
      </button>
    </div>
  );
}

export default PokemonInfo;
