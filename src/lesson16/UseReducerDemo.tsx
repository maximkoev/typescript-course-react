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
  payload?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
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
    // case "delete": {
    //   return { ...state, users: true };
    // }
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

const startLoadingAction = () => {
  return { type: "loading" };
};

const decrementAction = () => {
  return { type: "decrement" };
};
const incrementAction = () => {
  return { type: "increment" };
};
// const deleteUserAction = (id:number) => {
//   return { type: "delete", payload: id };
// };
const isLoadingSelector = (state: IState) => state.loading;
const countSelector = (state: IState) => state.count;

export function UseReducerDemo() {
  // const [state, setState] = useState(initialState);
  const [state, dispatch] = useReducer(reducer, initialState);
  // const { loading, count } = state;
  const loading = isLoadingSelector(state);
  const count = countSelector(state);
  // const count = useSelector(countSelector);

  const onHandleIncrement = async () => {
    dispatch(startLoadingAction());
    await later(500);
    dispatch(incrementAction());
  };
  const onHandleDecrement = async () => {
    dispatch(startLoadingAction());
    await later(500);
    dispatch(decrementAction());
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
